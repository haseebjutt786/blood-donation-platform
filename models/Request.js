import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    urgency: {
      type: String,
      enum: ["urgent", "normal"],
      default: "normal",
    },

    status: {
      type: String,
      enum: ["open", "fulfilled", "cancelled"],
      default: "open",
    },

    // GeoJSON Point — hospital/request location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: undefined,
      },
    },
  },
  {
    timestamps: true,
  }
);

// 2dsphere index for geo queries on requests
requestSchema.index({ location: "2dsphere" });

export default mongoose.models.Request ||
  mongoose.model("Request", requestSchema);
