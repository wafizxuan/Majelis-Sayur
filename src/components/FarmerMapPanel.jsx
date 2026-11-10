import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FarmerMapPanel({ location, onClose }) {
  const { t } = useTranslation();
  if (!location) return null;

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
  const color = typeColors[location.type] || location.color || "#4A5E3A";

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes slideInPanel {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        /* Mobile & tablet: bottom sheet */
        .map-panel {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          max-height: 50vh;
          border-radius: 16px 16px 0 0;
          animation: slideUp 0.32s cubic-bezier(0.16,1,0.3,1) forwards;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #F5F0E8;
          border-top: 1px solid #D4C9B0;
          box-shadow: 0 -8px 40px rgba(28,28,24,0.18);
        }

        /* Desktop: right sidebar */
        @media (min-width: 1024px) {
          .map-panel {
            position: relative;
            bottom: auto;
            left: auto;
            right: auto;
            z-index: auto;
            max-height: 100%;
            height: 100%;
            width: 340px;
            flex-shrink: 0;
            border-radius: 0;
            border-top: none;
            border-left: 1px solid #D4C9B0;
            box-shadow: none;
            animation: slideInPanel 0.32s cubic-bezier(0.16,1,0.3,1) forwards;
          }
          .map-panel-backdrop { display: none !important; }
          .map-panel-handle   { display: none !important; }
        }

        /* Landscape mode: reduce height to show more map */
        @media (max-height: 600px) {
          .map-panel {
            max-height: 65vh !important;
          }
          .map-panel-handle {
            padding-top: 6px !important;
            padding-bottom: 2px !important;
          }
        }

        @media (max-height: 500px) {
          .map-panel {
            max-height: 55vh;
          }
        }

        /* Tablet sm: narrower bottom sheet aligned right */
        @media (min-width: 640px) and (max-width: 767px) {
          .map-panel {
            left: auto;
            width: 360px !important;
            border-radius: 16px 0 0 0;
            max-height: 85vh;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .map-panel {
            left: auto;
            width: 420px;
            border-radius: 16px 0 0 0;
            max-height: 85vh;
          }
        }
      `}</style>

      {/* Backdrop (hidden on desktop via CSS) */}
      <div
        className="map-panel-backdrop"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(28,28,24,0.45)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Panel */}
      <div className="map-panel">
        {/* Pull handle — mobile/tablet only */}
        <div
          className="map-panel-handle"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 4,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "#D4C9B0",
            }}
          />
        </div>

        {/* Color accent bar */}
        <div style={{ height: 4, background: color, flexShrink: 0 }} />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #D4C9B0",
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.14em",
                color: "#8B6355",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              {location.type}
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1rem, 3vw, 1.15rem)",
                fontWeight: 700,
                color: "#2D3A22",
                lineHeight: 1.25,
                margin: 0,
              }}
            >
              {location.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              flexShrink: 0,
              marginTop: 2,
              opacity: 0.7,
            }}
            aria-label="Close panel"
          >
            <XMarkIcon style={{ width: 20, height: 20, color: "#5A6B45" }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Photo placeholder */}
          <div
            style={{
              width: "100%",
              height: 130,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#EDE5D4",
              borderBottom: "1px solid #D4C9B0",
              flexShrink: 0,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  margin: "0 auto 8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #D4C9B0",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ width: 16, height: 16, color: "#8B9E7A" }}
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 16l5-5 4 4 3-3 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "8px",
                  color: "#8B9E7A",
                  letterSpacing: "0.1em",
                }}
              >
                FOTO LOKASI
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* Address */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                LOKASI
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#3A3A32",
                  lineHeight: 1.55,
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
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {t("farmerDetail.managedBy")}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#2D3A22",
                  margin: 0,
                }}
              >
                {location.farmer}
              </p>
            </div>

            {/* Story */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                CERITA
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "#3A3A32",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {location.desc}
              </p>
            </div>

            {/* Crops */}
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "8px",
                  letterSpacing: "0.12em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                {t("farmerDetail.crops")}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {location.crops.map((crop) => (
                  <span
                    key={crop}
                    style={{
                      fontSize: "11px",
                      padding: "3px 10px",
                      border: "1px solid #D4C9B0",
                      color: "#5A6B45",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning */}
            {location.learning && (
              <div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "8px",
                    color: "#8B6355",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  }}
                >
                  PEMBELAJARAN
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "12px",
                    color: "#2D3A22",
                    margin: 0,
                  }}
                >
                  {location.learning}
                </p>
              </div>
            )}

            {/* Stats */}
            {(location.established || location.members || location.area) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  paddingTop: 12,
                  borderTop: "1px solid #D4C9B0",
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
                        marginBottom: 2,
                      }}
                    >
                      BERDIRI
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
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
                        marginBottom: 2,
                      }}
                    >
                      ANGGOTA
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#2D3A22",
                        margin: 0,
                      }}
                    >
                      {location.members}
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
                        marginBottom: 2,
                      }}
                    >
                      LUAS
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
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

            {/* Contact */}
            {(location.contact || location.schedule || location.instagram) && (
              <div
                style={{
                  paddingTop: 12,
                  borderTop: "1px solid #D4C9B0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {location.schedule && (
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "7px",
                        color: "#8B6355",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      JADWAL
                    </p>
                    <p
                      style={{ color: "#2D3A22", fontSize: "12px", margin: 0 }}
                    >
                      {location.schedule}
                    </p>
                  </div>
                )}
                {location.contact && (
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "7px",
                        color: "#8B6355",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      KONTAK
                    </p>
                    <a
                      href={`tel:${location.contact}`}
                      style={{ color: "#4A5E3A", fontSize: "12px" }}
                    >
                      {location.contact}
                    </a>
                  </div>
                )}
                {location.instagram && (
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "7px",
                        color: "#8B6355",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      INSTAGRAM
                    </p>
                    <p
                      style={{ color: "#2D3A22", fontSize: "12px", margin: 0 }}
                    >
                      {location.instagram}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid #D4C9B0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flexShrink: 0,
            background: "#F5F0E8",
          }}
        >
          <Link
            to={`/farmer/${location.id}`}
            className="detail-button"
            onClick={(e) => {
              console.log('Panel: Navigating to:', `/farmer/${location.id}`, location);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "12px 16px",
              background: "#4A5E3A",
              color: "#F5F0E8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
              border: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#3D4A2A";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#4A5E3A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            <span>Lihat Detail Lengkap</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              width: "100%",
              padding: "10px 14px",
              border: "1px solid #D4C9B0",
              background: "#F5F0E8",
              color: "#5A6B45",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#EDE5D4";
              e.currentTarget.style.borderColor = "#8B9E7A";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#F5F0E8";
              e.currentTarget.style.borderColor = "#D4C9B0";
            }}
          >
            <span>Buka di Google Maps</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M12 4L4 12M12 4H6M12 4V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
