import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donor from "@/models/Donor";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, bloodGroup, city, area } = body;

    if (!name || !email || !phone || !bloodGroup || !city || !area) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const existing = await Donor.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ success: false, message: "A donor with this email already exists" }, { status: 400 });
    }

    const donor = await Donor.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      bloodGroup,
      city: city.trim(),
      area: area.trim(),
      available: true,
    });

    return NextResponse.json({ success: true, message: "Donor registered successfully", donor }, { status: 201 });
  } catch (error) {
    console.error("Donor Registration Error:", error);
    return NextResponse.json({ success: false, message: "Failed to register donor" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get("bloodGroup");
    const city = searchParams.get("city");
    const showAll = searchParams.get("showAll");

    const filter = {};
    if (!showAll) filter.available = true;
    if (bloodGroup && bloodGroup !== "All") filter.bloodGroup = bloodGroup;
    if (city?.trim()) filter.city = { $regex: city.trim().slice(0, 50), $options: "i" };

    const donors = await Donor.find(filter).select("-__v").sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: donors.length, donors });
  } catch (error) {
    console.error("Donor Search Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch donors" }, { status: 500 });
  }
}
