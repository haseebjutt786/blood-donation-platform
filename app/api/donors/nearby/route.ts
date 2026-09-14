import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Donor from "@/models/Donor"

/**
 * GET /api/donors/nearby
 * Query params:
 *   lat      — latitude  (required)
 *   lng      — longitude (required)
 *   radius   — distance in km (default: 5)
 *   bloodGroup — filter by blood group (optional)
 *
 * Returns available donors sorted by distance (nearest first).
 * Uses MongoDB $near with 2dsphere index.
 *
 * Example:
 *   /api/donors/nearby?lat=33.6844&lng=73.0479&radius=10&bloodGroup=O+
 */
export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const lat = parseFloat(searchParams.get("lat") ?? "")
    const lng = parseFloat(searchParams.get("lng") ?? "")
    const radius = parseFloat(searchParams.get("radius") ?? "5")
    const bloodGroup = searchParams.get("bloodGroup")

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { success: false, message: "lat and lng are required and must be numbers" },
        { status: 400 }
      )
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json(
        { success: false, message: "Invalid coordinates" },
        { status: 400 }
      )
    }

    const maxRadius = Math.min(radius, 100) // cap at 100 km
    const maxDistanceMeters = maxRadius * 1000

    // Build filter — only available donors with a stored location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {
      available: true,
      "location.coordinates": { $exists: true },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat], // GeoJSON: [longitude, latitude]
          },
          $maxDistance: maxDistanceMeters,
        },
      },
    }

    if (bloodGroup && bloodGroup !== "All") {
      filter.bloodGroup = bloodGroup
    }

    const donors = await Donor.find(filter).select("-__v")

    // Calculate distance for each donor (Haversine)
    const withDistance = donors.map(donor => {
      const [dLng, dLat] = donor.location.coordinates
      const dist = haversineKm(lat, lng, dLat, dLng)
      return { ...donor.toObject(), distanceKm: Math.round(dist * 10) / 10 }
    })

    return NextResponse.json({
      success: true,
      count: withDistance.length,
      radius: maxRadius,
      donors: withDistance,
    })
  } catch (error) {
    console.error("Nearby Donors Error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch nearby donors" },
      { status: 500 }
    )
  }
}

/** Haversine formula — distance between two lat/lng points in km */
function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371 // Earth radius in km
  const dLat = deg2rad(lat2 - lat1)
  const dLng = deg2rad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}
