import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import Donor from "@/models/Donor"

// GET — list ALL donors including unavailable (admin only)
export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    const donors = await Donor.find()
      .select("-__v")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: donors.length, donors })
  } catch (error) {
    console.error("Admin Donors Error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch donors" }, { status: 500 })
  }
}
