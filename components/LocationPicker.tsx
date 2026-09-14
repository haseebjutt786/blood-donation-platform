"use client"

import { useEffect, useRef, useState } from "react"

export type LocationData = {
  lat: number
  lng: number
  address: string
}

type Props = {
  value: LocationData | null
  onChange: (location: LocationData | null) => void
  required?: boolean
}

// Reverse geocode using Nominatim (free, no API key)
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    )
    const data = await res.json()
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  }
}

export default function LocationPicker({ value, onChange, required }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null)

  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState("")
  const [mapReady, setMapReady] = useState(false)
  const [geocoding, setGeocoding] = useState(false)

  // Default center: Pakistan
  const DEFAULT_CENTER: [number, number] = [30.3753, 69.3451]
  const DEFAULT_ZOOM = 5

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Bail out if container was already cleaned up (StrictMode double-invoke)
      if (!mapRef.current) return

      // If Leaflet already initialized this container, remove it first
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const container = mapRef.current as any
      if (container._leaflet_id) {
        if (leafletMapRef.current) {
          leafletMapRef.current.remove()
          leafletMapRef.current = null
          markerRef.current = null
        }
        // If ref is gone but container still has an id, force-clear it
        container._leaflet_id = undefined
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const center: [number, number] = value
        ? [value.lat, value.lng]
        : DEFAULT_CENTER
      const zoom = value ? 14 : DEFAULT_ZOOM

      const map = L.map(mapRef.current!, { zoomControl: true }).setView(center, zoom)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      leafletMapRef.current = map
      setMapReady(true)

      // If value already set, place marker
      if (value) {
        const marker = L.marker([value.lat, value.lng], { draggable: true }).addTo(map)
        markerRef.current = marker
        bindMarkerDrag(marker, L)
      }

      // Click on map to place/move marker
      map.on("click", async (e: { latlng: { lat: number; lng: number } }) => {
        const { lat, lng } = e.latlng
        placeMarker(lat, lng, L)
      })
    })

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
        markerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function bindMarkerDrag(marker: any, L: any) {
    marker.on("dragend", async () => {
      const pos = marker.getLatLng()
      await updateLocation(pos.lat, pos.lng)
    })
    void L // suppress unused warning
  }

  async function placeMarker(lat: number, lng: number, L?: unknown) {
    // Remove old marker
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }

    const leaflet = L || (await import("leaflet"))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marker = (leaflet as any).marker([lat, lng], { draggable: true }).addTo(leafletMapRef.current)
    markerRef.current = marker
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bindMarkerDrag(marker, leaflet as any)

    await updateLocation(lat, lng)
  }

  async function updateLocation(lat: number, lng: number) {
    setGeocoding(true)
    const address = await reverseGeocode(lat, lng)
    setGeocoding(false)
    onChange({ lat, lng, address })
  }

  const handleGPS = () => {
    setGpsError("")
    setGpsLoading(true)

    if (!navigator.geolocation) {
      setGpsError("GPS is not supported by your browser.")
      setGpsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setGpsLoading(false)

        // Pan map to current location
        if (leafletMapRef.current) {
          leafletMapRef.current.setView([lat, lng], 15)
        }

        await placeMarker(lat, lng)
      },
      (err) => {
        setGpsLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError("Location permission denied. Please allow location access or click on the map.")
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsError("Location unavailable. Please click on the map to select.")
        } else {
          setGpsError("Could not get your location. Please click on the map.")
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }

  const handleClear = () => {
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }
    onChange(null)
    if (leafletMapRef.current) {
      leafletMapRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
    }
  }

  return (
    <div className="space-y-3">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Location on Map{required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGPS}
            disabled={gpsLoading}
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
          >
            {gpsLoading ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700" />
                Getting location…
              </>
            ) : (
              <>📍 Use My Location</>
            )}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* GPS error */}
      {gpsError && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs text-orange-700">
          ⚠️ {gpsError}
        </div>
      )}

      {/* Map hint */}
      {!value && !gpsError && (
        <p className="text-xs text-gray-400">
          Click on the map to pin your location, or use the GPS button above.
        </p>
      )}

      {/* Leaflet map container */}
      {/* Leaflet CSS loaded inline to avoid importing in _app */}
      <style>{`
        .leaflet-container { font-family: inherit; }
        .leaflet-control-attribution { font-size: 10px; }
      `}</style>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />

      <div
        ref={mapRef}
        className={`relative w-full overflow-hidden rounded-xl border-2 transition ${
          value ? "border-red-400" : "border-gray-200"
        }`}
        style={{ height: "280px" }}
      >
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
              <p className="mt-2 text-xs text-gray-500">Loading map…</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected location info */}
      {value && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-green-600">✓</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-green-800">Location selected</p>
              {geocoding ? (
                <p className="mt-0.5 text-xs text-green-600 animate-pulse">Getting address…</p>
              ) : (
                <p className="mt-0.5 text-xs text-green-700 break-words">{value.address}</p>
              )}
              <p className="mt-1 font-mono text-xs text-green-600">
                {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
