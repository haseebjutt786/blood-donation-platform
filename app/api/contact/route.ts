import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import mongoose from "mongoose"

// Simple contact message schema — inline, no separate model file needed
const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema)

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    // Basic email format check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailOk) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || "",
      message: message.trim(),
    })

    return NextResponse.json({
      success: true,
      message: "Message received. We'll get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
