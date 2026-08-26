// api.js
//
// Centralizes every call to our backend in one place. Instead of writing
// fetch("http://localhost:5000/...") everywhere, components just import
// these functions. If the backend URL ever changes, you edit ONE file.

const BASE_URL = "https://landscape-india-backend.onrender.com/api"

export async function fetchLands(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/lands${params ? `?${params}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch lands");
  return res.json();
}

export async function fetchLandById(id) {
  const res = await fetch(`${BASE_URL}/lands/${id}`);
  if (!res.ok) throw new Error("Failed to fetch land");
  return res.json();
}

// Uses the free Overpass API (OpenStreetMap data) to find nearby
// amenities like hospitals, schools, and markets around a coordinate.
// radiusMeters = how far around the point to search.
export async function fetchNearbyAmenities(lat, lon, radiusMeters = 2000) {
  // Overpass QL is a query language — this asks: "find nodes tagged as
  // hospital, school, or marketplace within `radiusMeters` of this point."
  const query = `
    [out:json][timeout:15];
    (
      node["amenity"="hospital"](around:${radiusMeters},${lat},${lon});
      node["amenity"="school"](around:${radiusMeters},${lat},${lon});
      node["amenity"="marketplace"](around:${radiusMeters},${lat},${lon});
      node["shop"="supermarket"](around:${radiusMeters},${lat},${lon});
      node["amenity"="bus_station"](around:${radiusMeters},${lat},${lon});
    );
    out center 20;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  if (!res.ok) throw new Error("Failed to fetch nearby amenities");
  const data = await res.json();

  // Simplify the raw Overpass response into something easy to render
  return data.elements.map((el) => ({
    id: el.id,
    name: el.tags?.name || "Unnamed",
    type: el.tags?.amenity || el.tags?.shop || "place",
    lat: el.lat,
    lon: el.lon,
  }));
}
