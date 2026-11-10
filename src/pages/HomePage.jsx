import { useState, lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FarmerMapPanel from "../components/FarmerMapPanel";
import { farmerLocations } from "../data/farmerLocations";
import { upcomingEvents, pastEvents } from "../data/events";

const FarmerMap = lazy(() => import("../components/FarmerMap"));

// ─── Manifesto Section ────────────────────────────────────────────────────────
function ManifestoSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#2D3A22", padding: "80px 0" }}
    >
      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
        {/* Label */}
        <div
          className="mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6B7F58",
            }}
          >
            {t("manifesto.label")}
          </span>
        </div>

        {/* Title */}
        <h2
          className="mb-12"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 700,
            color: "#F5F0E8",
            lineHeight: 1.25,
            whiteSpace: "pre-line",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {t("manifesto.title")}
        </h2>

        {/* Body text — two columns on desktop */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <div className="space-y-5">
            <p
              style={{ color: "#8B9E7A", lineHeight: 1.8, fontSize: "0.95rem" }}
            >
              {t("manifesto.p1")}
            </p>
            <p
              style={{ color: "#8B9E7A", lineHeight: 1.8, fontSize: "0.95rem" }}
            >
              {t("manifesto.p2")}
            </p>
          </div>
          <div className="space-y-5">
            <p
              style={{ color: "#8B9E7A", lineHeight: 1.8, fontSize: "0.95rem" }}
            >
              {t("manifesto.p3")}
            </p>
            <p
              style={{ color: "#8B9E7A", lineHeight: 1.8, fontSize: "0.95rem" }}
            >
              {t("manifesto.p4")}
            </p>
          </div>
        </div>

        {/* Quote */}
        <div
          style={{
            borderLeft: "2px solid #4A5E3A",
            paddingLeft: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#C4B99A",
              lineHeight: 1.6,
              marginBottom: "0.5rem",
            }}
          >
            {t("manifesto.quote")}
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#6B7F58",
            }}
          >
            {t("manifesto.quoteAuthor")}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Events Preview ───────────────────────────────────────────────────────────
function EventsPreview() {
  const { t } = useTranslation();
  const featured = upcomingEvents[0];
  const rest = upcomingEvents.slice(1, 4);

  return (
    <section
      style={{
        background: "#EDE5D4",
        padding: "80px 0",
        borderTop: "1px solid #D4C9B0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
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
              {t("events.label")}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: "#2D3A22",
                lineHeight: 1.2,
              }}
            >
              {t("events.title")}
            </h2>
          </div>
          <Link
            to="/events"
            className="hidden md:flex items-center gap-2 text-xs hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#5A6B45",
              letterSpacing: "0.1em",
            }}
          >
            LIHAT SEMUA →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Featured */}
          {featured && (
            <div
              className="lg:col-span-2 relative overflow-hidden group"
              style={{ background: "#4A5E3A", minHeight: 280 }}
            >
              <div
                className="p-8 h-full flex flex-col justify-between"
                style={{ minHeight: 280 }}
              >
                <div>
                  <span
                    className="inline-block mb-4 px-2 py-1 text-xs"
                    style={{
                      background: "rgba(245,240,232,0.15)",
                      color: "#C4B99A",
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {featured.tag}
                  </span>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                      fontWeight: 700,
                      color: "#F5F0E8",
                      lineHeight: 1.3,
                    }}
                  >
                    {featured.title}
                  </h3>
                  <p
                    style={{
                      color: "#8B9E7A",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                      maxWidth: "480px",
                    }}
                  >
                    {featured.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px",
                        color: "#6B7F58",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {featured.date} · {featured.location}
                    </p>
                  </div>
                  <Link
                    to="/events"
                    className="text-xs px-4 py-2 transition-colors hover:opacity-80"
                    style={{
                      background: "#F5F0E8",
                      color: "#2D3A22",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t("events.register")}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Rest */}
          <div className="flex flex-col gap-4">
            {rest.map((ev) => (
              <div
                key={ev.id}
                className="p-5 flex flex-col justify-between"
                style={{
                  background: "#F5F0E8",
                  border: "1px solid #D4C9B0",
                  flex: 1,
                }}
              >
                <div>
                  <span
                    className="inline-block mb-2 text-xs"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: "#8B6355",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {ev.tag}
                  </span>
                  <h4
                    className="mb-1"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#2D3A22",
                      lineHeight: 1.3,
                    }}
                  >
                    {ev.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#8B6355",
                    letterSpacing: "0.08em",
                    marginTop: "0.5rem",
                  }}
                >
                  {ev.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <Link
            to="/events"
            className="text-xs"
            style={{
              fontFamily: "'DM Mono', monospace",
              color: "#5A6B45",
              letterSpacing: "0.1em",
            }}
          >
            LIHAT SEMUA KEGIATAN →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── About Teaser ─────────────────────────────────────────────────────────────
function AboutTeaser() {
  return (
    <section
      style={{
        background: "#F5F0E8",
        padding: "80px 0",
        borderTop: "1px solid #D4C9B0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              Tentang Majelis Sayur
            </p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                color: "#2D3A22",
                lineHeight: 1.25,
              }}
            >
              Para petani kota Jagakarsa yang menyiasati ruang dan menanam
              kedaulatan.
            </h2>
            <p
              className="mb-6"
              style={{ color: "#5A6B45", lineHeight: 1.8, fontSize: "0.95rem" }}
            >
              Majelis Sayur diinisiasi sejak 2021 sebagai replika semangat para
              petani yang sudah dari dulu saling terhubung — bergotong royong,
              bekerja sama, berbagi informasi hulu hilir dari cara menanam
              hingga distribusi panen.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#4A5E3A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "11px",
              }}
            >
              BACA SELENGKAPNYA →
            </Link>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            {[
              { num: "2021", label: "Tahun Diinisiasi" },
              { num: "11+", label: "Kebun Aktif" },
              { num: "40+", label: "Warga Majelis" },
              { num: "80+", label: "Mitra Jaringan" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-5"
                style={{ border: "1px solid #D4C9B0", background: "#EDE5D4" }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#2D3A22",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#8B6355",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Network Strip ────────────────────────────────────────────────────────────
function NetworkStrip() {
  const collaborators = [
    { name: "ruangrupa", url: "https://ruangrupa.id/" },
    { name: "Gudskul Ekosistem", url: "https://gudskul.art/" },
    { name: "BRIN", url: "#" },
    { name: "Sekolah Tani Kota", url: "#" },
    { name: "Gapoktan Jagakarsa", url: "#" },
    { name: "KTH Kumbang", url: "#" },
    { name: "Selarasa Foodlab", url: "#" },
    { name: "Jakarta Biennale", url: "#" },
    { name: "Documenta Fifteen", url: "#" },
  ];

  return (
    <section
      style={{
        background: "#F5F0E8",
        borderTop: "1px solid #D4C9B0",
        borderBottom: "1px solid #D4C9B0",
        padding: "28px 0",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-6 md:gap-10 flex-wrap">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "#8B6355",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            JARINGAN
          </p>
          {collaborators.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target={c.url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-40"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#5A6B45",
                textDecoration: "none",
              }}
            >
              {c.name}
            </a>
          ))}
          <Link
            to="/network"
            className="transition-opacity hover:opacity-60 ml-auto"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#8B6355",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            SEMUA →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────
function ContactCTA() {
  const { t } = useTranslation();
  return (
    <section style={{ background: "#F5F0E8", padding: "80px 0" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#8B6355",
                textTransform: "uppercase",
              }}
            >
              KONTAK
            </p>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#2D3A22",
                lineHeight: 1.2,
              }}
            >
              {t("contact.title1")}{" "}
              <em style={{ color: "#4A5E3A" }}>{t("contact.title2")}</em>{" "}
              {t("contact.title3")}
            </h2>
            <p
              style={{
                color: "#5A6B45",
                lineHeight: 1.7,
                fontSize: "0.95rem",
                marginBottom: "2rem",
              }}
            >
              {t("contact.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/6281498365377"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  background: "#4A5E3A",
                  color: "#F5F0E8",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                WhatsApp
              </a>
              <a
                href="mailto:ngukngakofc@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-70"
                style={{
                  border: "1px solid #D4C9B0",
                  color: "#5A6B45",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Email
              </a>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                label: "ALAMAT",
                value: "Jl. Durian No.30A, Jagakarsa\nJakarta Selatan 12620",
              },
              { label: "EMAIL", value: "ngukngakofc@gmail.com" },
              { label: "WHATSAPP", value: "+62 814 9836 5377" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4"
                style={{ border: "1px solid #D4C9B0", background: "#EDE5D4" }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "#8B6355",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    color: "#2D3A22",
                    fontSize: "0.875rem",
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    console.log("Selected location changed:", selectedLocation);
  }, [selectedLocation]);

  return (
    <div style={{ background: "#F5F0E8" }}>
      {/* ── HERO: Interactive Map ── */}
      <section
        className="relative"
        style={{ paddingTop: "48px" }} // offset for topbar
      >
        {/* Map header */}
        <div
          className="flex items-end justify-between px-6 lg:px-10 py-6"
          style={{ borderBottom: "1px solid #D4C9B0" }}
        >
          <div>
            <p
              className="mb-1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "#8B6355",
                textTransform: "uppercase",
              }}
            >
              Jagakarsa · Jakarta Selatan · Indonesia
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.6rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "#2D3A22",
                lineHeight: 1.1,
              }}
            >
              {t("hero.tagline")}
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.12em",
                color: "#8B6355",
                textTransform: "uppercase",
              }}
            >
              {farmerLocations.length} KEBUN AKTIF
            </p>
          </div>
        </div>

        {/* Map + Panel */}
        <div
          className="relative flex"
          style={{
            height:
              "min(calc(100vh - 180px - env(safe-area-inset-bottom, 0px)), 680px)",
            minHeight: 400,
          }}
        >
          {/* Map */}
          <div className="flex-1 relative">
            <Suspense
              fallback={
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: "#EDE5D4" }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: "#8B6355",
                      letterSpacing: "0.15em",
                    }}
                  >
                    MEMUAT PETA...
                  </p>
                </div>
              }
            >
              <FarmerMap
                locations={farmerLocations}
                onSelectLocation={setSelectedLocation}
              />
            </Suspense>
          </div>

          {/* Sidebar panel */}
          {selectedLocation && (
            <FarmerMapPanel
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
            />
          )}
        </div>

        {/* Scroll indicator */}
        <div
          className="flex items-center justify-center py-4"
          style={{
            borderTop: "1px solid #D4C9B0",
            paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "#8B6355",
              textTransform: "uppercase",
            }}
          >
            ↓ {t("hero.scrollDown")}
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <ManifestoSection />

      {/* ── ABOUT TEASER ── */}
      <AboutTeaser />

      {/* ── EVENTS PREVIEW ── */}
      <EventsPreview />

      {/* ── NETWORK STRIP ── */}
      <NetworkStrip />

      {/* ── CONTACT CTA ── */}
      <ContactCTA />
    </div>
  );
}
