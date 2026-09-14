import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

/**
 * POST /api/auth/make-admin
 * Body: { email: string, secretKey: string }
 *
 * Use this endpoint once to promote the first admin.
 * secretKey must match ADMIN_SECRET_KEY in .env.local
 *
 * Example:
 *   curl -X POST http://localhost:3000/api/auth/make-admin \
 *     -H "Content-Type: application/json" \
 *     -d '{"email":"you@example.com","secretKey":"your-secret"}'
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, secretKey } = body

    if (!email || !secretKey) {
      return NextResponse.json(
        { success: false, message: "email and secretKey are required" },
        { status: 400 }
      )
    }

    const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY
    if (!ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, message: "ADMIN_SECRET_KEY is not configured on server" },
        { status: 500 }
      )
    }

    if (secretKey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, message: "Invalid secret key" },
        { status: 403 }
      )
    }

    await connectDB()

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: "admin" },
      { new: true, select: "-password -__v" }
    )

    if (!user) {
      return NextResponse.json(
        { success: false, message: "No user found with that email" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `${user.name} is now an admin`,
      user,
    })
  } catch (error) {
    console.error("Make Admin Error:", error)
    return NextResponse.json({ success: false, message: "Failed" }, { status: 500 })
  }
}
