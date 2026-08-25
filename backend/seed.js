// seed.js
//
// A "seed script" fills your empty database with sample data so you have
// something to look at immediately, instead of starting from zero.
// Run it with: npm run seed

import mongoose from "mongoose";
import dotenv from "dotenv";
import Land from "./models/Land.js";

dotenv.config();

const sampleLands = [
  {
    title: "2 Acre Farmland near Vijayawada",
    description: "Fertile agricultural land with borewell access, close to NH16.",
    price: 4500000,
    areaInSqft: 87120,
    location: { type: "Point", coordinates: [80.6480, 16.5062] }, // [lng, lat]
    city: "Vijayawada",
    state: "Andhra Pradesh",
    ownerContact: "9876543210",
  },
  {
    title: "Residential Plot in Whitefield",
    description: "DTCP approved plot, ready for construction, gated community.",
    price: 8500000,
    areaInSqft: 2400,
    location: { type: "Point", coordinates: [77.7500, 12.9698] },
    city: "Bangalore",
    state: "Karnataka",
    ownerContact: "9123456780",
  },
  {
    title: "Commercial Land on Highway",
    description: "Prime frontage land, ideal for warehouse or showroom.",
    price: 15000000,
    areaInSqft: 10890,
    location: { type: "Point", coordinates: [78.4867, 17.3850] },
    city: "Hyderabad",
    state: "Telangana",
    ownerContact: "9988776655",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/landscape_india");
    console.log("Connected to MongoDB, clearing old data...");
    await Land.deleteMany({});
    await Land.insertMany(sampleLands);
    console.log(`✅ Inserted ${sampleLands.length} sample lands`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
