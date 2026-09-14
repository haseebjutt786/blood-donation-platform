import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import Request from "@/models/Request"

// PATCH — update request status (admin only)
export async function PATCH(
  request: globalThis.Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()
    const { id } = await params
    const body = await request.json()

    const allowed = ["open", "fulfilled", "cancelled"]
    if (!allowed.includes(body.status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 })
    }

    const bloodRequest = await Request.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    )

    if (!bloodRequest) {
      return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Status updated", request: bloodRequest })
  } catch (error) {
    console.error("Admin Update Request Error:", error)
    return NextResponse.json({ success: false, message: "Failed to update request" }, { status: 500 })
  }
}

// DELETE — remove a blood request (admin only)
export async function DELETE(
  _request: globalThis.Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()
    const { id } = await params

    const bloodRequest = await Request.findByIdAndDelete(id)
    if (!bloodRequest) {
      return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Request deleted" })
  } catch (error) {
    console.error("Admin Delete Request Error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete request" }, { status: 500 })
  }
}
