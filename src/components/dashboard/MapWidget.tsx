"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapWidget() {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-border/10">
      <MapContainer 
        center={[51.505, -0.09]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="h-full w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </div>
  );
}
