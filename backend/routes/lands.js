// routes/lands.js
//
// A "route" is just: "when a request comes in to THIS url with THIS method
// (GET/POST/etc), run THIS function." Express calls these handlers in order.

import express from "express";
import Land from "../models/Land.js";

const router = express.Router();

// GET /api/lands
// Returns ALL land listings. Supports optional filters via query params, e.g.
// /api/lands?city=Vijayawada&maxPrice=5000000
router.get("/", async (req, res) => {
  try {
    const { city, maxPrice, minPrice } = req.query;

    const filter = {};
    if (city) filter.city = new RegExp(city, "i"); // "i" = case-insensitive
    if (maxPrice || minPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const lands = await Land.find(filter).sort({ createdAt: -1 });
    res.json(lands);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lands", error: err.message });
  }
});

// GET /api/lands/:id
// Returns ONE land listing by its MongoDB _id.
router.get("/:id", async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.json(land);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch land", error: err.message });
  }
});

// POST /api/lands
// Creates a new land listing. Expects a JSON body.
router.post("/", async (req, res) => {
  try {
    const newLand = new Land(req.body);
    const saved = await newLand.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create land", error: err.message });
  }
});

// PUT /api/lands/:id
// Updates an existing land listing.
router.put("/:id", async (req, res) => {
  try {
    const updated = await Land.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the UPDATED document, not the old one
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Land not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update land", error: err.message });
  }
});

// DELETE /api/lands/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Land.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Land not found" });
    res.json({ message: "Land deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete land", error: err.message });
  }
});

export default router;
