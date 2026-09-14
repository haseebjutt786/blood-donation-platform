import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";

// GET single donor by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const donor = await Donor.findById(id);

    if (!donor) {
      return NextResponse.json(
        { success: false, message: "Donor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, donor });
  } catch (error) {
    console.error("Get Donor Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch donor" },
      { status: 500 }
    );
  }
}

// PATCH — update availability
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const donor = await Donor.findByIdAndUpdate(
      id,
      { available: body.available },
      { new: true }
    );

    if (!donor) {
      return NextResponse.json(
        { success: false, message: "Donor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Availability updated successfully",
      donor,
    });
  } catch (error) {
    console.error("Availability Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update availability" },
      { status: 500 }
    );
  }
}
