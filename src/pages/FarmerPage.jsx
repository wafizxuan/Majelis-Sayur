import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { teamMembers, allMembers } from "../data/members";

// ─── Fasilitator Card — documentary portrait ──────────────────────────────────
function FasilitatorCard({ member }) {
  const { t } = useTranslation();
  const loc = farmerLocations.find((l) => l.id === member.farmerId);
  const color = loc?.color || "#4A5E3A";

  return (
    <div
      className="group relative overflow-hidden flex flex-col"
      style={{ border: "1px solid #D4C9B0", background: "#F5F0E8" }}
    >
      {/* Color strip */}
      <div style={{ height: 3, background: color, flexShrink: 0 }} />

      {/* Photo */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: "3/4", background: "#EDE5D4" }}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="w-10 h-10 mb-2 flex items-center justify-center"
              style={{ border: "1px solid #D4C9B0" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                style={{ color: "#8B9E7A" }}
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "7px",
                color: "#8B9E7A",
                letterSpacing: "0.1em",
              }}
            >
              FOTO
            </p>
          </div>
        )}

        {/* Philosophy on hover */}
        <div
          className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to top, rgba(45,58,34,0.92) 0%, transparent 55%)",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "#C4B99A",
              lineHeight: 1.5,
            }}
          >
            "{member.philosophy}"
          </p>
        </div>

        {/* Group badge */}
        <div
          className="absolute top-2 left-2"
          style={{ background: "rgba(245,240,232,0.92)", padding: "2px 7px" }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "7px",
              color: "#8B6355",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {member.group}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-truncate"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#2D3A22",
            marginBottom: "2px",
          }}
        >
          {member.name}
        </h3>
        <p
          className="mb-2"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "8px",
            color: "#8B6355",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {member.role}
        </p>
        <p
          className="text-clamp-3"
          style={{
            color: "#5A6B45",
            fontSize: "0.78rem",
            lineHeight: 1.6,
            marginBottom: "0.75rem",
            flex: 1,
          }}
        >
          {member.bio}
        </p>

        {/* Crops */}
        <div className="flex flex-wrap gap-1 mb-3">
          {member.crops.slice(0, 3).map((crop) => (
            <span
              key={crop}
              className="text-xs px-2 py-0.5"
              style={{
                border: "1px solid #D4C9B0",
                color: "#5A6B45",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
              }}
            >
              {crop}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="flex items-center justify-between">
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              color: "#8B9E7A",
              letterSpacing: "0.06em",
            }}
          >
            {member.location}
          </p>
          {member.farmerId && (
            <Link
              to={`/farmer/${member.farmerId}`}
              className="text-xs transition-opacity hover:opacity-60"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#4A5E3A",
                letterSpacing: "0.08em",
                fontSize: "8px",
                textTransform: "uppercase",
              }}
            >
              {t("farmer.readStory")} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── All Members Roll ─────────────────────────────────────────────────────────
function AllMembersRoll() {
  const groups = {};
  allMembers.forEach((m) => {
    if (!groups[m.group]) groups[m.group] = [];
    groups[m.group].push(m.name);
  });

  const sortedGroups = Object.entries(groups).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedGroups.map(([group, names]) => (
        <div
          key={group}
          className="p-4"
          style={{ border: "1px solid #D4C9B0", background: "#F5F0E8" }}
        >
          <p
            className="mb-3"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "8px",
              letterSpacing: "0.15em",
              color: "#8B6355",
              textTransform: "uppercase",
              borderBottom: "1px solid #D4C9B0",
              paddingBottom: "8px",
            }}
          >
            {group}
          </p>
          <ul className="space-y-1">
            {names.map((name) => (
              <li
                key={name}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "0.85rem",
                  color: "#2D3A22",
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function FarmerPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("fasilitator"); // 'fasilitator' | 'semua'

  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.group.toLowerCase().includes(search.toLowerCase()) ||
        m.crops.some((c) => c.toLowerCase().includes(search.toLowerCase()));
      const matchFilter =
        filter === "all" ||
        (filter === "core" && m.isCore) ||
        (filter === "active" && !m.isCore);
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

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
            {t("farmer.label")}
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
              {t("farmer.title")}
            </h1>
            <p
              style={{ color: "#5A6B45", fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              {t("farmer.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <section
        style={{ borderBottom: "1px solid #D4C9B0", background: "#EDE5D4" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-0">
            {[
              {
                key: "fasilitator",
                label: `Fasilitator (${teamMembers.length})`,
              },
              { key: "semua", label: `Semua Warga (${allMembers.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-3 text-xs transition-colors relative"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.08em",
                  color: activeTab === tab.key ? "#2D3A22" : "#8B9E7A",
                  borderBottom:
                    activeTab === tab.key
                      ? "2px solid #4A5E3A"
                      : "2px solid transparent",
                  background: "transparent",
                  marginBottom: "-1px",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FASILITATOR TAB ── */}
      {activeTab === "fasilitator" && (
        <>
          {/* Filters */}
          <section
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #D4C9B0",
              background: "#EDE5D4",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("farmer.searchPlaceholder")}
                  className="pl-3 pr-8 py-2 text-sm outline-none w-56"
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
              <div className="flex gap-1">
                {[
                  { key: "all", label: t("farmer.filterAll") },
                  { key: "core", label: t("farmer.filterCore") },
                  { key: "active", label: t("farmer.filterActive") },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="px-3 py-1.5 text-xs transition-colors"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "0.08em",
                      background: filter === f.key ? "#4A5E3A" : "transparent",
                      color: filter === f.key ? "#F5F0E8" : "#5A6B45",
                      border: "1px solid",
                      borderColor: filter === f.key ? "#4A5E3A" : "#D4C9B0",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "#8B6355",
                  letterSpacing: "0.1em",
                }}
              >
                {filtered.length} {t("farmer.members")}
              </p>
            </div>
          </section>

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
                    {t("farmer.empty")}
                  </p>
                  <p
                    style={{
                      color: "#8B9E7A",
                      fontSize: "0.85rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {t("farmer.emptySub")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filtered.map((member) => (
                    <FasilitatorCard key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── SEMUA WARGA TAB ── */}
      {activeTab === "semua" && (
        <section style={{ padding: "48px 0" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <p
              className="mb-6"
              style={{
                color: "#5A6B45",
                fontSize: "0.9rem",
                lineHeight: 1.6,
                maxWidth: "560px",
              }}
            >
              Daftar lengkap warga Majelis Sayur Jagakarsa — {allMembers.length}{" "}
              orang dari{" "}
              {
                Object.keys(
                  allMembers.reduce((a, m) => ({ ...a, [m.group]: 1 }), {}),
                ).length
              }{" "}
              kelompok.
            </p>
            <AllMembersRoll />
          </div>
        </section>
      )}

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
              {t("farmer.ctaTitle1")}{" "}
              <em style={{ color: "#8B9E7A" }}>{t("farmer.ctaTitle2")}</em>
            </h3>
            <p style={{ color: "#6B7F58", fontSize: "0.9rem" }}>
              {t("farmer.ctaDesc")}
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
            {t("farmer.ctaBtn")}
          </a>
        </div>
      </section>
    </div>
  );
}
