import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * DocumentationStrip — 3 baris foto infinite scroll
 * Baris 1: kanan, Baris 2: kiri, Baris 3: kanan
 * DATA DUMMY — ganti items dengan array URL foto nyata
 */

// DATA DUMMY — ganti dengan foto dokumentasi nyata dari API /api/documentation
// Format: array of { src: string, alt: string }
const docPhotos = [null, null, null, null, null, null, null, null];

// Placeholder foto
function DocCard({ photo, idx }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "clamp(200px, 60vw, 300px)",
        height: "clamp(130px, 40vw, 200px)",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#B8D4E8",
        marginRight: "20px",
        position: "relative",
      }}
    >
      {photo?.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        // Placeholder — ganti dengan foto nyata
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg,
            ${["#A8C8E8", "#B8D4E8", "#C8DFF0", "#7CB51830", "#4A7C5920"][idx % 5]} 0%,
            ${["#C0D8EE", "#D6E8F5", "#A8C8E8", "#B8D4E8", "#C8DFF0"][idx % 5]} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            style={{ width: "32px", height: "32px", opacity: 0.3 }}
          >
            <rect
              x="4"
              y="4"
              width="32"
              height="32"
              rx="3"
              stroke="#1A2E05"
              strokeWidth="2"
            />
            <circle cx="14" cy="14" r="4" stroke="#1A2E05" strokeWidth="2" />
            <path
              d="M4 28l10-8 8 6 6-5 8 7"
              stroke="#1A2E05"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// Satu baris infinite scroll
function ScrollRow({ direction = "right", speed = 35, photos }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const rafRef = useRef(null);

  // Duplikat foto agar loop mulus
  const items = [...photos, ...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardW = 300 + 20; // width + gap
    const total = photos.length * cardW;

    const animate = () => {
      if (direction === "right") {
        posRef.current -= speed / 60;
        if (Math.abs(posRef.current) >= total) posRef.current = 0;
      } else {
        posRef.current += speed / 60;
        if (posRef.current >= 0) posRef.current = -total;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    // Init position untuk direction kiri
    if (direction === "left") posRef.current = -photos.length * cardW;

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed, photos.length]);

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          willChange: "transform",
        }}
      >
        {items.map((photo, i) => (
          <DocCard key={i} photo={photo} idx={i} />
        ))}
      </div>
    </div>
  );
}

export default function DocumentationStrip() {
  const { t } = useTranslation();
  // 8 foto per baris — ganti dengan data nyata
  const row1 = docPhotos;
  const row2 = [...docPhotos].reverse();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Judul */}
        <h2 className="text-3xl sm:text-4xl font-black text-dark-green leading-none">
          <span
            className="italic"
            style={{
              backgroundColor: "#F5C518",
              padding: "0 12px 4px",
              fontFamily: "Georgia, serif",
            }}
          >
            {t("docs.title")}
          </span>
        </h2>
        <p className="text-sm text-dark-green/50 mt-3">{t("docs.subtitle")}</p>
      </div>

      {/* 2 baris scroll */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <ScrollRow direction="right" speed={30} photos={row1} />
        <ScrollRow direction="left" speed={25} photos={row2} />
      </div>
    </section>
  );
}
