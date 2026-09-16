import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    city: { type: String, required: true, trim: true },
    hospital: { type: String, required: true, trim: true },
    contactPhone: { type: String, required: true },
    message: { type: String, trim: true, default: "" },
    urgency: { type: String, enum: ["urgent", "normal"], default: "normal" },
    status: { type: String, enum: ["open", "fulfilled", "cancelled"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
