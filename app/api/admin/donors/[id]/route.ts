import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import Donor from "@/models/Donor"

// DELETE — remove a donor (admin only)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()
    const { id } = await params

    const donor = await Donor.findByIdAndDelete(id)
    if (!donor) {
      return NextResponse.json({ success: false, message: "Donor not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Donor deleted" })
  } catch (error) {
    console.error("Admin Delete Donor Error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete donor" }, { status: 500 })
  }
}
