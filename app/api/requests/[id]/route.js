import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Request from "@/models/Request";

// GET single request
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const bloodRequest = await Request.findById(id);

    if (!bloodRequest) {
      return NextResponse.json(
        { success: false, message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request: bloodRequest });
  } catch (error) {
    console.error("Get Request Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch request" },
      { status: 500 }
    );
  }
}

// PATCH — update request status
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const allowed = ["open", "fulfilled", "cancelled"];
    if (!allowed.includes(body.status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    const bloodRequest = await Request.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!bloodRequest) {
      return NextResponse.json(
        { success: false, message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request updated successfully",
      request: bloodRequest,
    });
  } catch (error) {
    console.error("Update Request Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update request" },
      { status: 500 }
    );
  }
}
