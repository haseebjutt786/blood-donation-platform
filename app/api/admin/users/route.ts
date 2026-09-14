import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import User from "@/models/User"

// GET — list all users (admin only)
export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    const users = await User.find()
      .select("-password -__v")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, count: users.length, users })
  } catch (error) {
    console.error("Admin Users Error:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 })
  }
}
