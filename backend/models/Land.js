// models/Land.js
//
// A Mongoose "Schema" is just a blueprint: it tells MongoDB what shape
// each "land" document should have. Think of it like defining the
// columns of a spreadsheet, except MongoDB is flexible about it.

import mongoose from "mongoose";

const landSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // every land MUST have a title
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number, // stored in INR (rupees)
      required: true,
    },
    areaInSqft: {
      type: Number,
      required: true,
    },
    // GeoJSON format — this is the standard way MongoDB stores map coordinates.
    // NOTE: MongoDB wants [longitude, latitude] — in that order (easy to mix up!).
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    ownerContact: {
      type: String,
      default: "Not provided",
    },
    imageUrl: {
      type: String,
      default: "https://placehold.co/600x400?text=Land+Photo",
    },
  },
  {
    timestamps: true, // automatically adds createdAt / updatedAt fields
  }
);

// This tells MongoDB: "index the location field for fast geo-searches"
// (useful later if you want to search "lands near me")
landSchema.index({ location: "2dsphere" });

// "Land" here becomes the MongoDB collection name "lands" (Mongoose auto-lowercases + pluralizes)
export default mongoose.model("Land", landSchema);
