import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Donor from "@/models/Donor"
import Request from "@/models/Request"

export async function GET() {
  try {
    await connectDB()

    const [users, donors, activeDonors, requests, fulfilledRequests] =
      await Promise.all([
        User.countDocuments(),
        Donor.countDocuments(),
        Donor.countDocuments({ available: true }),
        Request.countDocuments(),
        Request.countDocuments({ status: "fulfilled" }),
      ])

    return NextResponse.json({
      success: true,
      stats: {
        users,
        donors,
        activeDonors,
        requests,
        fulfilledRequests,
      },
    })
  } catch (error) {
    console.error("Stats Error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
