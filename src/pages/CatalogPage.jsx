import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { products, categories } from "../data/products";

// ─── Plant Card ───────────────────────────────────────────────────────────────
function PlantCard({ product, onClick }) {
  const { t } = useTranslation();

  const categoryColors = {
    "sayur-sayuran": "#4A5E3A",
    "buah-buahan": "#5C3D2E",
    toga: "#8B6355",
    "tanaman-hias": "#5A6B45",
  };
  const color = categoryColors[product.category] || "#4A5E3A";

  return (
    <div
      className="group cursor-pointer"
      style={{ border: "1px solid #D4C9B0", background: "#F5F0E8" }}
      onClick={() => onClick(product)}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", background: "#EDE5D4" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="w-10 h-10 mb-2 flex items-center justify-center"
            style={{ border: "1px solid #D4C9B0" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              style={{ color: "#8B9E7A" }}
            >
              <path
                d="M12 3C12 3 18 8 18 14C18 17.3 15.3 20 12 20C8.7 20 6 17.3 6 14C6 8 12 3 12 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 3C12 3 15 9 14 14C13.3 17 12 18.5 12 18.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
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
            FOTO TANAMAN
          </p>
        </div>

        {/* Category badge */}
        <div
          className="absolute top-3 left-3"
          style={{ background: color, padding: "3px 8px" }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              color: "#F5F0E8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {product.categoryLabel ||
              {
                "sayur-sayuran": "Sayur Sayuran",
                "buah-buahan": "Buah Buahan",
                toga: "Tanaman Obat Keluarga (TOGA)",
                "tanaman-hias": "Tanaman Hias",
                olahan: "Produk Olahan",
              }[product.category] ||
              product.category}
          </p>
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: "rgba(45,58,34,0.7)" }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#F5F0E8",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            LIHAT DETAIL
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#2D3A22",
            marginBottom: "2px",
          }}
        >
          {product.name}
        </h3>
        <p
          className="mb-3"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            color: "#8B6355",
            letterSpacing: "0.08em",
          }}
        >
          {t("catalog.farmerBy")} {product.farmer}
        </p>
        <p
          style={{
            color: "#5A6B45",
            fontSize: "0.8rem",
            lineHeight: 1.5,
            marginBottom: "0.75rem",
          }}
        >
          {product.ecologicalNote.substring(0, 80)}...
        </p>
        <div className="flex items-center justify-between">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              color: "#8B9E7A",
              letterSpacing: "0.08em",
            }}
          >
            {product.harvestSeason}
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              color: "#8B9E7A",
              letterSpacing: "0.08em",
            }}
          >
            {product.cultivationMethod}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function PlantModal({ product, onClose }) {
  const { t } = useTranslation();
  if (!product) return null;

  const categoryColors = {
    "sayur-sayuran": "#4A5E3A",
    "buah-buahan": "#5C3D2E",
    toga: "#8B6355",
    "tanaman-hias": "#5A6B45",
  };
  const color = categoryColors[product.category] || "#4A5E3A";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(28,28,24,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden"
        style={{
          background: "#F5F0E8",
          border: "1px solid #D4C9B0",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color strip */}
        <div style={{ height: 3, background: color }} />

        {/* Header */}
        <div
          className="flex items-start justify-between p-6"
          style={{ borderBottom: "1px solid #D4C9B0" }}
        >
          <div>
            <p
              className="mb-1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                color: "#8B6355",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {product.categoryLabel ||
                {
                  "sayur-sayuran": "Sayur Sayuran",
                  "buah-buahan": "Buah Buahan",
                  toga: "Tanaman Obat Keluarga (TOGA)",
                  "tanaman-hias": "Tanaman Hias",
                  olahan: "Produk Olahan",
                }[product.category] ||
                product.category}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#2D3A22",
              }}
            >
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:opacity-60 transition-opacity"
            style={{ color: "#5A6B45" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Photo placeholder */}
        <div
          style={{
            aspectRatio: "16/9",
            background: "#EDE5D4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#8B9E7A",
              letterSpacing: "0.12em",
            }}
          >
            FOTO TANAMAN
          </p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <p style={{ color: "#3A3A32", lineHeight: 1.7, fontSize: "0.9rem" }}>
            {product.ecologicalNote}
          </p>

          <div
            className="grid grid-cols-1 xs:grid-cols-2 gap-4 pt-2"
            style={{ borderTop: "1px solid #D4C9B0" }}
          >
            {[
              { label: t("catalog.location"), value: product.location },
              { label: t("catalog.harvest"), value: product.harvestSeason },
              { label: t("catalog.method"), value: product.cultivationMethod },
              { label: t("catalog.farmerBy"), value: product.farmer },
            ].map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#8B6355",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "3px",
                  }}
                >
                  {item.label}
                </p>
                <p style={{ color: "#2D3A22", fontSize: "0.85rem" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productList] = useState(() => {
    const stored = localStorage.getItem("ms_katalog");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    // Fallback and seed if empty
    localStorage.setItem("ms_katalog", JSON.stringify(products));
    return products;
  });

  const filtered = useMemo(() => {
    return productList.filter((p) => {
      const matchSearch =
        !search ||
        (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
        (p.farmer && p.farmer.toLowerCase().includes(search.toLowerCase())) ||
        (p.ecologicalNote &&
          p.ecologicalNote.toLowerCase().includes(search.toLowerCase()));
      const matchCat =
        activeCategory === "semua" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [productList, search, activeCategory]);

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
            {t("catalog.label")}
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
              {t("catalog.title")}
            </h1>
            <p
              style={{ color: "#5A6B45", fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              {t("catalog.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section
        style={{
          padding: "20px 0",
          borderBottom: "1px solid #D4C9B0",
          background: "#EDE5D4",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Category tabs */}
          <div className="flex gap-1 flex-wrap mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-4 py-1.5 text-xs transition-colors"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.08em",
                  background:
                    activeCategory === cat.id ? "#4A5E3A" : "transparent",
                  color: activeCategory === cat.id ? "#F5F0E8" : "#5A6B45",
                  border: "1px solid",
                  borderColor:
                    activeCategory === cat.id ? "#4A5E3A" : "#D4C9B0",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + count */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("catalog.search")}
                className="pl-3 pr-8 py-2 text-sm outline-none w-64"
                style={{
                  background: "#F5F0E8",
                  border: "1px solid #D4C9B0",
                  color: "#2D3A22",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                  style={{ color: "#5A6B45" }}
                >
                  ✕
                </button>
              )}
            </div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#8B6355",
                letterSpacing: "0.1em",
              }}
            >
              {filtered.length} {t("catalog.products")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section style={{ padding: "48px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  color: "#8B6355",
                  fontSize: "1.1rem",
                }}
              >
                {t("catalog.empty")}
              </p>
              <p
                style={{
                  color: "#8B9E7A",
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                }}
              >
                {t("catalog.emptySub")}
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("semua");
                }}
                className="mt-4 text-xs transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#4A5E3A",
                  letterSpacing: "0.1em",
                }}
              >
                {t("catalog.reset")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <PlantCard
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: "60px 0",
          background: "#2D3A22",
          borderTop: "1px solid #3D4A2A",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#F5F0E8",
                marginBottom: "0.5rem",
              }}
            >
              {t("catalog.ctaTitle1")}{" "}
              <em style={{ color: "#8B9E7A" }}>{t("catalog.ctaTitle2")}</em>
            </h3>
            <p style={{ color: "#6B7F58", fontSize: "0.9rem" }}>
              {t("catalog.ctaDesc")}
            </p>
          </div>
          <a
            href="https://wa.me/6281498365377"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: "#4A5E3A",
              color: "#F5F0E8",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {t("catalog.ctaBtn")}
          </a>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <PlantModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
