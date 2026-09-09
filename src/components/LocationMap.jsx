import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { organizationDirectory } from "../data/assignmentRules";

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// User location icon
const userIcon = L.divIcon({
  className: "custom-user-marker",
  html: `
    <div class="user-location-marker">
      <div class="user-location-dot"></div>
      <div class="user-location-pulse"></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Recenter map
function MapRecenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14, {
        animate: true,
      });
    }
  }, [position, map]);

  return null;
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function LocationMap({
  selectedCategory = "",
  onLocationDetected,
}) {
  const [position, setPosition] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const defaultCenter = [17.6599, 75.9064];

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const newPosition = [
          location.coords.latitude,
          location.coords.longitude,
        ];

        setPosition(newPosition);

        if (onLocationDetected) {
          onLocationDetected({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            exactLocation: "Live location detected",
          });
        }

        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          setLocationError("Location is unavailable.");
        } else if (error.code === 3) {
          setLocationError("Location request timed out.");
        } else {
          setLocationError("Unable to detect your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const nearbyOrganizations = useMemo(() => {
    if (!position) return [];

    const [userLat, userLng] = position;

    return organizationDirectory
      .map((org) => {
        const distance = calculateDistanceKm(
          userLat,
          userLng,
          org.latitude,
          org.longitude
        );

        return {
          ...org,
          distance,
        };
      })
      .filter((org) => {
        if (org.distance > 15) return false;

        if (!selectedCategory) return true;

        return (
          org.category === selectedCategory ||
          org.keywords?.some((keyword) =>
            selectedCategory.toLowerCase().includes(keyword.toLowerCase())
          ) ||
          org.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        );
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);
  }, [position, selectedCategory]);

  return (
    <div className="location-map-wrapper">
      <div className="location-map-header">
        <div>
          <h3>📍 Live Location & Nearby Centers</h3>
          <p>
            Detect your location to find the nearest department, college,
            government center or service point.
          </p>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={detectLocation}
          disabled={locationLoading}
        >
          {locationLoading ? "Detecting..." : "📍 Use My Location"}
        </button>
      </div>

      {position && (
        <div className="map-location-success">
          ✅ Live location detected successfully.
        </div>
      )}

      {locationError && (
        <div className="map-location-error">
          ⚠️ {locationError}
        </div>
      )}

      <div className="map-container">
        <MapContainer
          center={position || defaultCenter}
          zoom={position ? 14 : 13}
          scrollWheelZoom={true}
          style={{ height: "420px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {position && (
            <>
              <MapRecenter position={position} />

              <Marker position={position} icon={userIcon}>
                <Popup>
                  <strong>📍 Your Current Location</strong>
                  <br />
                  Latitude: {position[0].toFixed(6)}
                  <br />
                  Longitude: {position[1].toFixed(6)}
                </Popup>
              </Marker>

              <Circle
                center={position}
                radius={1500}
                pathOptions={{
                  color: "#2563eb",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.1,
                }}
              />
            </>
          )}

          {nearbyOrganizations.map((org) => (
            <Marker
              key={org.id}
              position={[org.latitude, org.longitude]}
            >
              <Popup>
                <strong>{org.name}</strong>
                <br />
                Type: {org.type}
                <br />
                Category: {org.category}
                <br />
                Distance: {org.distance.toFixed(2)} km
                <br />
                Service: {org.service}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {position && (
        <div className="nearby-organizations">
          <h3>🏢 Nearby Organizations</h3>

          {nearbyOrganizations.length > 0 ? (
            <div className="nearby-list">
              {nearbyOrganizations.map((org) => (
                <div className="nearby-organization-card" key={org.id}>
                  <div className="nearby-org-icon">
                    {org.type === "Government"
                      ? "🏛️"
                      : org.type === "College"
                      ? "🎓"
                      : "🏢"}
                  </div>

                  <div className="nearby-org-info">
                    <h4>{org.name}</h4>

                    <p>
                      <strong>Type:</strong> {org.type}
                    </p>

                    <p>
                      <strong>Service:</strong> {org.service}
                    </p>

                    <p>
                      <strong>Team:</strong> {org.team}
                    </p>
                  </div>

                  <div className="nearby-distance">
                    {org.distance.toFixed(2)} km
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="nearby-empty">
              No suitable organization found within 15 km.
            </div>
          )}
        </div>
      )}
    </div>
  );
}