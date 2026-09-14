"use client"

import { useEffect, useRef } from "react"
import type { Donor } from "../../../types/donor"

type NearbyDonor = Donor & { distanceKm: number }

type Props = {
  userLocation: { lat: number; lng: number }
  donors: NearbyDonor[]
  radius: number
}

export default function NearbyMap({ userLocation, donors, radius }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Remove existing map before re-render
    if (leafletMapRef.current) {
      leafletMapRef.current.remove()
      leafletMapRef.current = null
    }

    import("leaflet").then((L) => {
      if (!mapRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const container = mapRef.current as any
      if (container._leaflet_id) container._leaflet_id = undefined

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const map = L.map(mapRef.current!, {
        scrollWheelZoom: false,
      }).setView([userLocation.lat, userLocation.lng], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // User location marker (blue)
      const userIcon = L.divIcon({
        html: `<div style="
          width:18px;height:18px;
          border-radius:50%;
          background:#3b82f6;
          border:3px solid white;
          box-shadow:0 0 0 3px rgba(59,130,246,0.4)
        "></div>`,
        className: "",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<strong>You are here</strong>")

      // Radius circle
      L.circle([userLocation.lat, userLocation.lng], {
        radius: radius * 1000,
        color: "#ef4444",
        fillColor: "#ef4444",
        fillOpacity: 0.05,
        weight: 1.5,
        dashArray: "6",
      }).addTo(map)

      // Donor markers (red)
      const donorIcon = L.divIcon({
        html: `<div style="
          width:14px;height:14px;
          border-radius:50%;
          background:#dc2626;
          border:2px solid white;
          box-shadow:0 1px 4px rgba(0,0,0,0.3)
        "></div>`,
        className: "",
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })

      donors.forEach(donor => {
        if (!donor.location?.coordinates) return
        const [lng, lat] = donor.location.coordinates
        L.marker([lat, lng], { icon: donorIcon })
          .addTo(map)
          .bindPopup(`
            <strong>${donor.name}</strong><br/>
            🩸 ${donor.bloodGroup}<br/>
            📍 ${donor.city}, ${donor.area}<br/>
            <em>${donor.distanceKm} km away</em>
          `)
      })

      // Fit map to show all markers
      if (donors.length > 0) {
        const allPoints: [number, number][] = [
          [userLocation.lat, userLocation.lng],
          ...donors
            .filter(d => d.location?.coordinates)
            .map(d => [
              d.location!.coordinates[1],
              d.location!.coordinates[0],
            ] as [number, number]),
        ]
        map.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40], maxZoom: 15 })
      }

      leafletMapRef.current = map
    })

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [userLocation, donors, radius])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div
        ref={mapRef}
        className="w-full rounded-xl border border-gray-200 overflow-hidden"
        style={{ height: "380px" }}
      />
      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500" /> You
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-red-600" /> Donors
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border border-red-300 bg-red-50" />
          {radius} km radius
        </span>
      </div>
    </>
  )
}
