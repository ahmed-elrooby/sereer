"use client";

import React, { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      onLocationSelect(lat, lng);
    },
  });

  return null;
};

const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(position, 16, {
      animate: true,
      duration: 1,
    });
  }, [position, map]);

  return null;
};

const FacilityMap = ({
  position,
  defaultCenter,
  onLocationSelect,
}) => {
  return (
    <MapContainer
      center={position || defaultCenter}
      zoom={position ? 16 : 4}
      scrollWheelZoom
      className="w-full h-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationPicker
        onLocationSelect={onLocationSelect}
      />

      <MapController position={position} />

      {position && (
        <Marker
          position={position}
          icon={markerIcon}
        />
      )}
    </MapContainer>
  );
};

export default FacilityMap;
