// SearchFilter.jsx
//
// A "controlled component": every input's value comes from React state,
// and every keystroke updates that state via onChange. This is THE
// standard way to handle forms in React.

import { useState } from "react";

export default function SearchFilter({ onSearch }) {
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stops the browser from doing a full page reload
    onSearch({ city, maxPrice }); // sends the filter values up to App.jsx
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="City (e.g. Vijayawada)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Max price (₹)"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
}

const styles = {
  form: { display: "flex", gap: "8px", padding: "10px", background: "#f5f5f5" },
  input: { padding: "8px", borderRadius: "6px", border: "1px solid #ccc", flex: 1 },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};
