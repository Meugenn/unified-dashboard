"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

const markers = [
  { position: [51.505, -0.09] as [number, number], title: "London", description: "Europe Data Hub" },
  { position: [48.8566, 2.3522] as [number, number], title: "Paris", description: "European Union" },
  { position: [9.0820, 8.6753] as [number, number], title: "Abuja", description: "West Africa Hub" },
  { position: [40.7128, -74.0060] as [number, number], title: "New York", description: "World Data Center" },
  { position: [35.6762, 139.6503] as [number, number], title: "Tokyo", description: "Asia-Pacific Region" },
  { position: [-33.8688, 151.2093] as [number, number], title: "Sydney", description: "Oceania Region" },
];

export default function Map() {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{marker.title}</h3>
              <p className="text-gray-600">{marker.description}</p>
              <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                View Data
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}