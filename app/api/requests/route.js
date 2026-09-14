import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";

// POST — create a blood request
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      patientName, bloodGroup, city, hospital,
      contactPhone, message, urgency, location,
    } = body;

    if (!patientName || !bloodGroup || !city || !hospital || !contactPhone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Patient name, blood group, city, hospital, and contact phone are required",
        },
        { status: 400 }
      );
    }

    const requestData = {
      patientName: patientName.trim(),
      bloodGroup,
      city: city.trim(),
      hospital: hospital.trim(),
      contactPhone,
      message: message?.trim() || "",
      urgency: urgency || "normal",
      status: "open",
    };

    // Attach GeoJSON location if provided and valid
    if (
      location &&
      typeof location.lat === "number" &&
      typeof location.lng === "number" &&
      !isNaN(location.lat) &&
      !isNaN(location.lng)
    ) {
      requestData.location = {
        type: "Point",
        coordinates: [location.lng, location.lat], // GeoJSON: [lng, lat]
      };
    }

    const bloodRequest = await Request.create(requestData);

    return NextResponse.json(
      {
        success: true,
        message: "Blood request created successfully",
        request: bloodRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request Creation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create request" },
      { status: 500 }
    );
  }
}

// GET — fetch blood requests
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get("bloodGroup");
    const city = searchParams.get("city");
    const status = searchParams.get("status") || "open";

    const filter = { status };

    if (bloodGroup && bloodGroup !== "All") {
      filter.bloodGroup = bloodGroup;
    }

    if (city && city.trim()) {
      const safeCity = city.trim().slice(0, 50);
      filter.city = { $regex: safeCity, $options: "i" };
    }

    const requests = await Request.find(filter)
      .select("-__v")
      .sort({ urgency: -1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Requests Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
