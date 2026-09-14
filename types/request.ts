// Matches the MongoDB Request document shape
export type BloodRequest = {
  _id: string
  patientName: string
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  city: string
  hospital: string
  contactPhone: string
  message: string
  urgency: "urgent" | "normal"
  status: "open" | "fulfilled" | "cancelled"
  // GeoJSON Point — optional
  location?: {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
  }
  createdAt: string
  updatedAt: string
}
