import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Tooltip,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { jagakarsaBoundary } from "../data/jagakarsaBoundary";

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Earthy color map for location types
const typeColors = {
  "Kebun Komunitas": "#4A5E3A",
  "Pusat Komunitas": "#5C3D2E",
  "Kebun Tepi Sungai": "#3D4A2A",
  "Urban Farm": "#6B7F58",
  "Kebun Pribadi": "#8B6355",
  "Kebun Edukasi": "#5A6B45",
  "Kebun Hutan Kota": "#2D3A22",
  "Kebun Terapeutik": "#C4714A",
};

const createMarker = (color, isSelected, isHovered) => {
  const size = isSelected ? 44 : isHovered ? 38 : 30;
  const c = color || "#4A5E3A";
  return L.divIcon({
    className: "",
    html: `<div style="
      width:${size}px; height:${size}px;
      background:${c};
      border:2px solid #F5F0E8;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 2px ${isSelected ? 16 : 8}px rgba(28,28,24,0.3);
      transition:all 0.2s ease;
    ">
      <div style="
        width:${Math.round(size * 0.3)}px;
        height:${Math.round(size * 0.3)}px;
        background:#F5F0E8;
        border-radius:50%;
        transform:rotate(45deg);
        margin:auto;
        margin-top:${Math.round(size * 0.28)}px;
      "></div>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

// ── Map popup overlay (rendered outside Leaflet, over the map) ────────────────
function MapPopup({ location, color, onClose }) {
  const map = useMap();

  // Convert lat/lng to pixel position relative to the map container
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!location || !map) return;

    const updatePos = () => {
      const point = map.latLngToContainerPoint([location.lat, location.lng]);
      setPos({ x: point.x, y: point.y });
    };

    updatePos();
    map.on("move zoom", updatePos);
    return () => map.off("move zoom", updatePos);
  }, [location, map]);

  // Close popup when clicking on the map background (not on markers)
  useEffect(() => {
    if (!map) return;
    const handleMapClick = () => {
      onClose();
    };
    map.on("click", handleMapClick);
    return () => map.off("click", handleMapClick);
  }, [map, onClose]);

  if (!location || !pos) return null;

  // Determine popup horizontal alignment — avoid clipping at right edge
  const mapWidth = map.getContainer().offsetWidth;
  const popupWidth = 260;
  let left = pos.x - popupWidth / 2;
  if (left + popupWidth > mapWidth - 12) left = mapWidth - popupWidth - 12;
  if (left < 12) left = 12;

  const top = pos.y - 16; // popup sits above marker (marker anchor = bottom)

  const mapContainer = map.getContainer();

  const stopLeaflet = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      onClick={stopLeaflet}
      onMouseDown={stopLeaflet}
      onDoubleClick={stopLeaflet}
      style={{
        position: "absolute",
        left: left,
        top: top,
        transform: "translateY(-100%)",
        width: popupWidth,
        zIndex: 900,
        background: "#F5F0E8",
        border: "1px solid #D4C9B0",
        boxShadow: "0 8px 32px rgba(28,28,24,0.22)",
        animation: "mapPopupIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards",
        pointerEvents: "auto",
      }}
    >
      {/* Color accent top bar */}
      <div style={{ height: 3, background: color, flexShrink: 0 }} />

      {/* Header */}
      <div
        style={{
          padding: "10px 12px 8px",
          borderBottom: "1px solid #EDE5D4",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              letterSpacing: "0.14em",
              color: color,
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            {location.type}
          </p>
          <h4
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#2D3A22",
              lineHeight: 1.25,
              margin: 0,
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {location.name}
          </h4>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
            color: "#8B9E7A",
            fontSize: "14px",
            lineHeight: 1,
            flexShrink: 0,
            marginTop: 1,
          }}
          aria-label="Tutup popup"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Address */}
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "7px",
              letterSpacing: "0.12em",
              color: "#8B6355",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Lokasi
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "#3A3A32",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {location.address}
          </p>
        </div>

        {/* Farmer */}
        <div>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "7px",
              letterSpacing: "0.12em",
              color: "#8B6355",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Dikelola
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#2D3A22",
              margin: 0,
            }}
          >
            {location.farmer}
          </p>
        </div>

        {/* Stats row */}
        {(location.established || location.members || location.area) && (
          <div
            style={{
              display: "flex",
              gap: 12,
              paddingTop: 6,
              borderTop: "1px solid #EDE5D4",
            }}
          >
            {location.established && (
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "7px",
                    color: "#8B6355",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 1,
                  }}
                >
                  Berdiri
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#2D3A22",
                    margin: 0,
                  }}
                >
                  {location.established}
                </p>
              </div>
            )}
            {location.members && (
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "7px",
                    color: "#8B6355",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 1,
                  }}
                >
                  Anggota
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#2D3A22",
                    margin: 0,
                  }}
                >
                  {location.members} org
                </p>
              </div>
            )}
            {location.area && (
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "7px",
                    color: "#8B6355",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 1,
                  }}
                >
                  Luas
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#2D3A22",
                    margin: 0,
                  }}
                >
                  {location.area}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Crops */}
        {location.crops && location.crops.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "7px",
                letterSpacing: "0.12em",
                color: "#8B6355",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Tanaman
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {location.crops.slice(0, 4).map((crop) => (
                <span
                  key={crop}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    color: "#5A6B45",
                    border: "1px solid #D4C9B0",
                    padding: "2px 6px",
                  }}
                >
                  {crop}
                </span>
              ))}
              {location.crops.length > 4 && (
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#8B9E7A",
                    padding: "2px 4px",
                  }}
                >
                  +{location.crops.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer button */}
      <div style={{ padding: "0 12px 12px", display: "flex", gap: 6 }}>
        <Link
          to={`/farmer/${location.id}`}
          onClick={(e) => {
            console.log('Navigating to:', `/farmer/${location.id}`);
          }}
          style={{
            flex: 1,
            padding: "8px 10px",
            background: color,
            color: "#F5F0E8",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            transition: "all 0.2s ease",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>Lihat Detail Lengkap</span>
          <span>→</span>
        </Link>
        <a
          href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "8px 10px",
            border: "1px solid #D4C9B0",
            color: "#5A6B45",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#EDE5D4";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Maps
        </a>
      </div>

      {/* Arrow / tail pointing down toward the marker */}
      <div
        style={{
          position: "absolute",
          bottom: -9,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid #D4C9B0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -7,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderTop: "7px solid #F5F0E8",
        }}
      />
    </div>,
    mapContainer,
  );
}

// ── Inner map component (has access to useMap) ────────────────────────────────
function MapInner({ locations, onSelectLocation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [popupLocation, setPopupLocation] = useState(null);

  const handleMarkerClick = (loc) => {
    // Sederhanakan state update agar responsif
    setPopupLocation(loc);
    setSelectedId(loc.id);
  };

  const handleClosePopup = () => {
    setPopupLocation(null);
    setSelectedId(null);
  };

  return (
    <>
      <GeoJSON
        data={jagakarsaBoundary}
        style={{
          color: "#8B6355",
          weight: 2,
          opacity: 0.6,
          dashArray: "5, 5",
          fillColor: "#8B9E7A",
          fillOpacity: 0.08,
        }}
      />

      {locations.map((loc) => {
        const isSelected = selectedId === loc.id;
        const isHovered = hoveredId === loc.id;
        const color = typeColors[loc.type] || loc.color || "#4A5E3A";

        return (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createMarker(color, isSelected, isHovered)}
            eventHandlers={{
              click: () => handleMarkerClick(loc),
              mouseover: () => setHoveredId(loc.id),
              mouseout: () => setHoveredId(null),
            }}
          >
            {/* Hover circle */}
            {isHovered && (
              <Circle
                center={[loc.lat, loc.lng]}
                radius={80}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.08,
                  weight: 1,
                  opacity: 0.3,
                }}
              />
            )}

            <Tooltip
              permanent={false}
              direction="top"
              offset={[0, -30]}
              className="leaflet-tooltip-earthy"
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#2D3A22",
                  background: "#F5F0E8",
                  border: "1px solid #D4C9B0",
                  padding: "4px 8px",
                  borderRadius: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {loc.name}
                <div
                  style={{
                    fontSize: "9px",
                    color: "#8B6355",
                    fontWeight: 400,
                    marginTop: 1,
                  }}
                >
                  {loc.type}
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      })}

      {/* Floating popup overlay */}
      {popupLocation && (
        <MapPopup
          location={popupLocation}
          color={
            typeColors[popupLocation.type] || popupLocation.color || "#4A5E3A"
          }
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}

export default function FarmerMap({ locations, onSelectLocation }) {
  const center = [-6.335, 106.825];

  return (
    <div
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
      style={{ borderRadius: 0 }}
    >
      <style>{`
        @keyframes mapPopupIn {
          from { opacity: 0; transform: translateY(calc(-100% + 10px)); }
          to   { opacity: 1; transform: translateY(-100%); }
        }
        .leaflet-pane { z-index: 400 !important; }
        .leaflet-top, .leaflet-bottom { z-index: 500 !important; }
      `}</style>

      <MapContainer
        center={center}
        zoom={14}
        minZoom={13}
        maxZoom={17}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: "#EDE5D4" }}
        maxBounds={[
          [-6.39, 106.795],
          [-6.29, 106.87],
        ]}
        maxBoundsViscosity={0.9}
        zoomControl={true}
      >
        {/* CartoDB Positron — clean, minimal, earthy */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />

        <MapInner locations={locations} onSelectLocation={onSelectLocation} />
      </MapContainer>

      {/* Map hint overlay */}
      <div
        className="absolute bottom-4 left-4 z-10 pointer-events-none"
        style={{
          background: "rgba(245,240,232,0.9)",
          border: "1px solid #D4C9B0",
          padding: "6px 10px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "#5A6B45",
            textTransform: "uppercase",
          }}
        >
          Klik pin untuk membaca cerita kebun
        </p>
      </div>
    </div>
  );
}
