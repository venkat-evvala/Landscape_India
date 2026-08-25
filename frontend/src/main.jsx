// main.jsx
//
// This is the very first JS file that runs. Its only job: find the <div id="root">
// in index.html, and tell React "render my <App /> component inside it."

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
