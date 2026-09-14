import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    // GeoJSON Point — for nearby donor search (2dsphere queries)
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

// 2dsphere index — enables $near, $geoWithin, $geoIntersects queries
// Required for "Find donors within X km" feature
donorSchema.index({ location: "2dsphere" });

export default mongoose.models.Donor ||
  mongoose.model("Donor", donorSchema);
