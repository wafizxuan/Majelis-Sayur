import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { farmerLocations } from "../data/farmerLocations";

export default function FarmerDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const location = farmerLocations.find((l) => l.id === parseInt(id));

  if (!location) {
    return (
      <div
        style={{
          background: "#F5F0E8",
          paddingTop: "48px",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              color: "#8B6355",
              fontSize: "1.2rem",
            }}
          >
            Lokasi tidak ditemukan.
          </p>
          <Link
            to="/farmer"
            className="mt-4 inline-block text-xs"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#4A5E3A",
              letterSpacing: "0.1em",
            }}
          >
            ← {t("farmerDetail.back")}
          </Link>
        </div>
      </div>
    );
  }

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
    <div style={{ background: "#F5F0E8", paddingTop: "48px" }}>
      {/* ── Back nav ── */}
      <div style={{ borderBottom: "1px solid #D4C9B0", padding: "12px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link
            to="/"
            className="text-xs transition-opacity hover:opacity-60"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#5A6B45",
              letterSpacing: "0.1em",
            }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section style={{ borderBottom: "1px solid #D4C9B0" }}>
        {/* Color strip */}
        <div style={{ height: 4, background: color }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main info */}
            <div className="lg:col-span-2">
              <p
                className="mb-2"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                }}
              >
                {location.type}
              </p>
              <h1
                className="mb-4"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#2D3A22",
                  lineHeight: 1.1,
                }}
              >
                {location.name}
              </h1>
              <p
                style={{
                  color: "#5A6B45",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                {location.address}
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "#8B6355",
                  letterSpacing: "0.08em",
                }}
              >
                {t("farmerDetail.managedBy")}: {location.farmer}
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6">
              {[
                {
                  label: t("farmerDetail.established"),
                  value: location.established,
                },
                { label: t("farmerDetail.members"), value: location.members },
                { label: t("farmerDetail.area"), value: location.area },
              ]
                .filter((s) => s.value)
                .map((stat) => (
                  <div key={stat.label} className="flex-1 lg:flex-none">
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "9px",
                        color: "#8B6355",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {stat.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#2D3A22",
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section style={{ padding: "60px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                }}
              >
                {t("farmerDetail.story")}
              </p>
            </div>
            <div className="lg:col-span-2">
              {/* Short desc */}
              <p
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.15rem",
                  color: "#2D3A22",
                  lineHeight: 1.7,
                }}
              >
                {location.desc}
              </p>
              {/* Full story */}
              {location.story && (
                <p
                  style={{
                    color: "#3A3A32",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  {location.story}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Crops + Contact ── */}
      <section
        style={{
          padding: "60px 0",
          background: "#EDE5D4",
          borderBottom: "1px solid #D4C9B0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Crops */}
            <div>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                }}
              >
                {t("farmerDetail.crops")}
              </p>
              <div className="flex flex-wrap gap-2">
                {location.crops.map((crop) => (
                  <span
                    key={crop}
                    className="px-4 py-2 text-sm"
                    style={{
                      border: "1px solid #D4C9B0",
                      color: "#2D3A22",
                      background: "#F5F0E8",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact / Schedule */}
            <div>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#8B6355",
                  textTransform: "uppercase",
                }}
              >
                Info Kunjungan
              </p>
              <div className="space-y-3">
                {[
                  { label: "PEMBELAJARAN", value: location.learning },
                  { label: "JADWAL", value: location.schedule },
                  { label: "PESERTA", value: location.maxParticipants },
                  { label: "KONTAK", value: location.contact },
                  { label: "INSTAGRAM", value: location.instagram },
                  { label: "LUAS", value: location.area },
                ]
                  .filter((i) => i.value)
                  .map((item) => (
                    <div key={item.label}>
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "9px",
                          color: "#8B6355",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: "3px",
                        }}
                      >
                        {item.label}
                      </p>
                      <p style={{ color: "#2D3A22", fontSize: "0.875rem" }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Documentation placeholder ── */}
      <section style={{ padding: "60px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p
            className="mb-8"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#8B6355",
              textTransform: "uppercase",
            }}
          >
            {t("farmerDetail.docs")}
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {location.gallery && location.gallery.length > 0
              ? location.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${location.name} doc ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover border border-gray-200"
                  />
                ))
              : [1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "4/3",
                      background: "#EDE5D4",
                      border: "1px solid #D4C9B0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "8px",
                        color: "#8B9E7A",
                        letterSpacing: "0.1em",
                      }}
                    >
                      FOTO {String(i).padStart(2, "0")}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* ── Actions ── */}
      <section style={{ padding: "40px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: "#4A5E3A",
              color: "#F5F0E8",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t("farmerDetail.openMaps")}
          </a>
          {location.contact && (
            <a
              href={`https://wa.me/${location.contact.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                background: "#5C3D2E",
                color: "#F5F0E8",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              WhatsApp Fasilitator
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
