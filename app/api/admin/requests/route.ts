import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import Request from "@/models/Request"

// GET — list ALL requests with any status (admin only)
export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    const requests = await Request.find()
      .select("-__v")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: requests.length, requests })
  } catch (error) {
    console.error("Admin Requests Error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch requests" }, { status: 500 })
  }
}
