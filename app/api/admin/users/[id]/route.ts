import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { getSession } from "@/lib/auth"
import User from "@/models/User"

// PATCH — change user role (admin only)
export async function PATCH(
  request: Request,
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

    if (!["donor", "admin"].includes(body.role)) {
      return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 })
    }

    // Prevent admin from demoting themselves
    if (id === session.id && body.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "You cannot change your own role" },
        { status: 400 }
      )
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role: body.role },
      { new: true, select: "-password -__v" }
    )

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Role updated", user })
  } catch (error) {
    console.error("Admin Update User Error:", error)
    return NextResponse.json({ success: false, message: "Failed to update user" }, { status: 500 })
  }
}

// DELETE — delete a user (admin only)
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

    if (id === session.id) {
      return NextResponse.json(
        { success: false, message: "You cannot delete your own account" },
        { status: 400 }
      )
    }

    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "User deleted" })
  } catch (error) {
    console.error("Admin Delete User Error:", error)
    return NextResponse.json({ success: false, message: "Failed to delete user" }, { status: 500 })
  }
}
