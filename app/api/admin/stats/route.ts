import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import User from "@/models/User"
import Donor from "@/models/Donor"
import Request from "@/models/Request"

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    const [
      totalUsers,
      totalDonors,
      availableDonors,
      totalRequests,
      openRequests,
      urgentRequests,
      fulfilledRequests,
    ] = await Promise.all([
      User.countDocuments(),
      Donor.countDocuments(),
      Donor.countDocuments({ available: true }),
      Request.countDocuments(),
      Request.countDocuments({ status: "open" }),
      Request.countDocuments({ status: "open", urgency: "urgent" }),
      Request.countDocuments({ status: "fulfilled" }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalDonors,
        availableDonors,
        totalRequests,
        openRequests,
        urgentRequests,
        fulfilledRequests,
      },
    })
  } catch (error) {
    console.error("Admin Stats Error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch stats" }, { status: 500 })
  }
}
