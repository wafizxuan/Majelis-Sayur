import { useState } from "react";
import { useTranslation } from "react-i18next";
import { upcomingEvents, pastEvents } from "../data/events";

function EventCard({ event, featured = false }) {
  const { t } = useTranslation();

  if (featured) {
    return (
      <div
        className="relative overflow-hidden"
        style={{ background: "#4A5E3A", minHeight: 320 }}
      >
        <div
          className="p-8 md:p-12 h-full flex flex-col justify-between"
          style={{ minHeight: 320 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-2 py-1 text-xs"
                style={{
                  background: "rgba(245,240,232,0.15)",
                  color: "#C4B99A",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.1em",
                }}
              >
                {event.tag}
              </span>
              <span
                className="text-xs"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#6B7F58",
                  letterSpacing: "0.08em",
                }}
              >
                FEATURED
              </span>
            </div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "#F5F0E8",
                lineHeight: 1.25,
              }}
            >
              {event.title}
            </h2>
            <p
              style={{
                color: "#8B9E7A",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: "560px",
              }}
            >
              {event.desc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "#6B7F58",
                  letterSpacing: "0.1em",
                  marginBottom: "2px",
                }}
              >
                {event.date}
              </p>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "#6B7F58",
                  letterSpacing: "0.08em",
                }}
              >
                {event.location}
              </p>
              {event.collaborators && (
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#4A5E3A",
                    letterSpacing: "0.08em",
                    marginTop: "4px",
                  }}
                >
                  {t("events.collaborators")}:{" "}
                  {Array.isArray(event.collaborators)
                    ? event.collaborators.join(", ")
                    : event.collaborators}
                </p>
              )}
            </div>
            <a
              href="https://wa.me/6281498365377"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 flex-shrink-0"
              style={{
                background: "#F5F0E8",
                color: "#2D3A22",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {t("events.register")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-5 flex flex-col justify-between"
      style={{
        border: "1px solid #D4C9B0",
        background: "#F5F0E8",
        minHeight: 160,
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs px-2 py-0.5"
            style={{
              border: "1px solid #D4C9B0",
              color: "#8B6355",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.08em",
            }}
          >
            {event.tag}
          </span>
        </div>
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#2D3A22",
            lineHeight: 1.3,
          }}
        >
          {event.title}
        </h3>
        <p style={{ color: "#5A6B45", fontSize: "0.8rem", lineHeight: 1.5 }}>
          {event.desc}
        </p>
      </div>
      <div className="mt-4 pt-3" style={{ borderTop: "1px solid #D4C9B0" }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            color: "#8B6355",
            letterSpacing: "0.08em",
            marginBottom: "2px",
          }}
        >
          {event.date}
        </p>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            color: "#8B9E7A",
            letterSpacing: "0.06em",
          }}
        >
          {event.location}
        </p>
        {event.collaborators && (
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              color: "#8B9E7A",
              letterSpacing: "0.06em",
              marginTop: "2px",
            }}
          >
            {Array.isArray(event.collaborators)
              ? event.collaborators.join(" · ")
              : event.collaborators}
          </p>
        )}
      </div>
    </div>
  );
}

function PastEventCard({ event }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parts[0];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        return `${day} ${months[monthIdx] || ""} ${year}`;
      }
    }
    return dateStr;
  };

  return (
    <div
      className="p-5 flex flex-col justify-between h-full"
      style={{ border: "1px solid #D4C9B0", background: "#EDE5D4" }}
    >
      <div>
        {/* Photo Container */}
        <div
          className="mb-4 flex items-center justify-center overflow-hidden rounded border border-parchment"
          style={{ aspectRatio: "16/9", background: "#D4C9B0" }}
        >
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "8px",
                color: "#8B9E7A",
                letterSpacing: "0.1em",
              }}
            >
              FOTO DOKUMENTASI
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs px-2 py-0.5"
            style={{
              border: "1px solid #D4C9B0",
              color: "#8B6355",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.08em",
            }}
          >
            {event.tag}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#8B9E7A",
              letterSpacing: "0.08em",
            }}
          >
            {formatDate(event.date)}
          </span>
        </div>

        <h3
          className="mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#2D3A22",
            lineHeight: 1.3,
          }}
        >
          {event.title}
        </h3>

        {event.recap && (
          <p
            className="mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "0.85rem",
              color: "#5A6B45",
              lineHeight: 1.5,
            }}
          >
            "{event.recap}"
          </p>
        )}
      </div>

      {event.collaborators && event.collaborators.length > 0 && (
        <div className="mt-auto pt-2">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              color: "#8B9E7A",
              letterSpacing: "0.06em",
            }}
          >
            {Array.isArray(event.collaborators)
              ? event.collaborators.join(" · ")
              : event.collaborators}
          </p>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const { t } = useTranslation();

  // Load upcoming events from ms_agenda_m
  const [upcomingList] = useState(() => {
    const stored = localStorage.getItem("ms_agenda_m");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem("ms_agenda_m", JSON.stringify(upcomingEvents));
    return upcomingEvents;
  });

  // Load past events/activities from ms_arsip
  const [pastList] = useState(() => {
    const stored = localStorage.getItem("ms_arsip");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          // Filter to only get Activities (Kegiatan) or Photo Documentation
          const filtered = parsed.filter(
            (item) =>
              item.jenis === "Kegiatan" || item.jenis === "Dokumentasi Foto",
          );
          if (filtered.length > 0) {
            // Map the arsip structure to the event structure
            return filtered.map((item) => ({
              id: item.id,
              title: item.judul,
              date: item.tanggal, // Format: YYYY-MM-DD
              location: item.location || "Jagakarsa, Jakarta",
              desc: item.deskripsi,
              tag: item.tags ? item.tags.split(",")[0].trim() : "Kegiatan",
              collaborators: item.penulis
                ? item.penulis.split(",").map((s) => s.trim())
                : [],
              recap: item.recap || item.deskripsi,
              image: item.image,
            }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    return pastEvents;
  });

  const [featured, ...rest] = upcomingList;

  return (
    <div style={{ background: "#F5F0E8", paddingTop: "48px" }}>
      {/* ── Header ── */}
      <section
        style={{ padding: "60px 0 40px", borderBottom: "1px solid #D4C9B0" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
            {t("events.label")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#2D3A22",
                lineHeight: 1.2,
              }}
            >
              {t("events.title")}
            </h1>
            <p
              style={{ color: "#5A6B45", fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              {t("events.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Upcoming ── */}
      <section style={{ padding: "48px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p
            className="mb-6"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#8B6355",
              textTransform: "uppercase",
            }}
          >
            {t("events.upcoming")}
          </p>

          {/* Featured */}
          {featured && (
            <div className="mb-4">
              <EventCard event={featured} featured />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Events Archive ── */}
      <section style={{ padding: "48px 0", background: "#EDE5D4" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p
            className="mb-6"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#8B6355",
              textTransform: "uppercase",
            }}
          >
            {t("events.past")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pastList.map((ev) => (
              <PastEventCard key={ev.id} event={ev} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
