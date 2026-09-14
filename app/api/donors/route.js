import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";

// POST — register a donor
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, bloodGroup, city, area, location } = body;

    // Validate required fields
    if (!name || !email || !phone || !bloodGroup || !city || !area) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existing = await Donor.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "A donor with this email already exists" },
        { status: 400 }
      );
    }

    // Build donor object
    const donorData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      bloodGroup,
      city: city.trim(),
      area: area.trim(),
      available: true,
    };

    // Attach GeoJSON location if provided and valid
    if (
      location &&
      typeof location.lat === "number" &&
      typeof location.lng === "number" &&
      !isNaN(location.lat) &&
      !isNaN(location.lng)
    ) {
      donorData.location = {
        type: "Point",
        // GeoJSON order: [longitude, latitude]
        coordinates: [location.lng, location.lat],
      };
    }

    const donor = await Donor.create(donorData);

    return NextResponse.json(
      { success: true, message: "Donor registered successfully", donor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donor Registration Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to register donor" },
      { status: 500 }
    );
  }
}

// GET — search donors
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get("bloodGroup");
    const city = searchParams.get("city");
    const showAll = searchParams.get("showAll");

    // Nearby search params (for future use)
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius"); // in km

    const filter = {};

    if (!showAll) {
      filter.available = true;
    }

    if (bloodGroup && bloodGroup !== "All") {
      filter.bloodGroup = bloodGroup;
    }

    if (city && city.trim()) {
      const safeCity = city.trim().slice(0, 50);
      filter.city = { $regex: safeCity, $options: "i" };
    }

    // Nearby donor search — $near with 2dsphere index
    if (lat && lng && radius) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      const parsedRadius = parseFloat(radius);

      if (!isNaN(parsedLat) && !isNaN(parsedLng) && !isNaN(parsedRadius)) {
        filter.location = {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parsedLng, parsedLat], // GeoJSON: [lng, lat]
            },
            $maxDistance: parsedRadius * 1000, // Convert km → meters
          },
        };
      }
    }

    const donors = await Donor.find(filter)
      .select("-__v")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    console.error("Donor Search Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}
