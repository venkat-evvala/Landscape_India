// App.jsx
//
// This is the "parent" component. It owns the main data (the list of lands)
// and passes it DOWN to children (MapView, SearchFilter) via props.
// This top-down data flow is the core mental model of React.

import { useState, useEffect } from "react";
import MapView from "./components/MapView.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import { fetchLands } from "./api.js";

export default function App() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once when the app first loads (empty dependency array = [])
  useEffect(() => {
    loadLands({});
  }, []);

  async function loadLands(filters) {
    setLoading(true);
    setError(null);
    try {
      // Remove empty filter values before sending to the API
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== "" && v != null)
      );
      const data = await fetchLands(cleanFilters);
      setLands(data);
    } catch (err) {
      setError("Could not load land listings. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={{ padding: "12px 20px", background: "#1e3a8a", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "1.3rem" }}>🌍 Landscape India</h1>
        <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.85 }}>
          Explore land properties across India
        </p>
      </header>

      <SearchFilter onSearch={loadLands} />

      {error && <p style={{ color: "red", padding: "0 20px" }}>{error}</p>}
      {loading && <p style={{ padding: "0 20px" }}>Loading listings...</p>}

      <div style={{ flex: 1 }}>
        <MapView lands={lands} />
      </div>
    </div>
  );
}
