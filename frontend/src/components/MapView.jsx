// MapView.jsx
//
// This component renders the actual interactive map.
// Key React concepts used here:
//   - props: data passed IN from the parent (App.jsx), e.g. `lands`
//   - components: <MapContainer>, <Marker>, <Popup> come from react-leaflet
//     and wrap Leaflet's map logic so we can write it as JSX

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import NearbyAmenities from "./NearbyAmenities.jsx";

// Leaflet's default marker icon breaks when bundled by Vite, so we
// manually point it at icon images hosted online. This is a common
// beginner "gotcha" with react-leaflet — good to know why it's here.
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView({ lands }) {
  // Default map center: roughly the center of India
  const indiaCenter = [22.5, 79.0];

  return (
    <MapContainer
      center={indiaCenter}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      {/* TileLayer = the actual visual map images (roads, terrain, etc.) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* One <Marker> per land listing. .map() loops over the array. */}
      {lands.map((land) => {
        // Remember: MongoDB stores [longitude, latitude], but Leaflet wants [latitude, longitude]
        const [lng, lat] = land.location.coordinates;

        return (
          <Marker key={land._id} position={[lat, lng]} icon={defaultIcon}>
            <Popup maxWidth={280}>
              <div>
                <strong>{land.title}</strong>
                <p style={{ margin: "4px 0" }}>
                  ₹{land.price.toLocaleString("en-IN")} · {land.areaInSqft} sqft
                </p>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  {land.city}, {land.state}
                </p>
                {/* This nested component fetches & shows nearby hospitals/schools/etc
                    ONLY when this specific popup is open — keeps things fast. */}
                <NearbyAmenities lat={lat} lon={lng} />
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
