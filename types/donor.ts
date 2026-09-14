// Matches the MongoDB Donor document shape
export type Donor = {
  _id: string
  name: string
  email: string
  phone: string
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  city: string
  area: string
  available: boolean
  // GeoJSON Point — optional (not all donors have location)
  location?: {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
  }
  createdAt: string
  updatedAt: string
}
