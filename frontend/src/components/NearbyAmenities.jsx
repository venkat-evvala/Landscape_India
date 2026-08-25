// NearbyAmenities.jsx
//
// Demonstrates two core React Hooks:
//   - useState: lets a component "remember" data between renders
//   - useEffect: lets a component run code (like an API call) at a
//     specific moment — here, "when this component first appears"

import { useState, useEffect } from "react";
import { fetchNearbyAmenities } from "../api.js";

export default function NearbyAmenities({ lat, lon }) {
  const [amenities, setAmenities] = useState([]); // starts as an empty list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // An "async" function defined and called immediately inside useEffect
    // is a common pattern, since useEffect itself can't be async directly.
    async function loadAmenities() {
      try {
        const results = await fetchNearbyAmenities(lat, lon);
        setAmenities(results.slice(0, 5)); // just show top 5 to keep popup small
      } catch (err) {
        setError("Couldn't load nearby places");
      } finally {
        setLoading(false);
      }
    }

    loadAmenities();
  }, [lat, lon]); // re-run this effect if lat/lon ever change

  if (loading) return <p style={{ fontSize: "0.85em" }}>Loading nearby places...</p>;
  if (error) return <p style={{ fontSize: "0.85em", color: "red" }}>{error}</p>;
  if (amenities.length === 0)
    return <p style={{ fontSize: "0.85em" }}>No amenities found nearby.</p>;

  return (
    <div style={{ marginTop: "6px" }}>
      <strong style={{ fontSize: "0.85em" }}>Nearby:</strong>
      <ul style={{ margin: "4px 0", paddingLeft: "18px", fontSize: "0.8em" }}>
        {amenities.map((a) => (
          <li key={a.id}>
            {a.name} <em style={{ color: "#888" }}>({a.type})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
