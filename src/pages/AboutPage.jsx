import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { allMembers } from "../data/members";

function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useVisible(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline() {
  const items = [
    {
      year: "1960-an",
      event:
        "Jagakarsa (bagian dari Pasar Minggu) memasok 16 juta kg dari 24 juta kg kebutuhan pasar Jakarta. Petani buah menjadi mata pencaharian hampir semua penduduk.",
    },
    {
      year: "1990-an",
      event:
        "Era Gapoktan. Wilayah Jagakarsa identik dengan Gabungan Kelompok Tani yang saling terhubung — bergotong royong, berbagi informasi hulu hilir dari cara menanam hingga distribusi panen.",
    },
    {
      year: "2021",
      event:
        "Majelis Sayur diinisiasi — replika semangat para petani yang sudah dari dulu saling terhubung. Sekolah Tani Kota lahir sebagai ruang belajar agroekologi.",
    },
    {
      year: "2018",
      event:
        "Gudskul Ekosistem menjadi rumah bagi komunitas pertanian urban Jagakarsa.",
    },
    {
      year: "2021",
      event:
        "Majelis Sayur resmi terbentuk. Bermula dari kebutuhan sederhana: mendekatkan produsen kepada konsumen.",
    },
    {
      year: "Kini",
      event:
        "11+ kebun aktif, 40+ warga, jaringan 80+ mitra. Visi: fondasi kedaulatan pangan kewilayahan yang berkelanjutan.",
    },
  ];

  return (
    <div className="relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "#D4C9B0", marginLeft: "3px" }}
      />
      <div className="space-y-7 pl-8">
        {items.map((item, i) => (
          <div key={i} className="relative">
            <div
              className="absolute -left-8 top-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: "#4A5E3A" }}
            />
            <p
              className="mb-1"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "#8B6355",
                textTransform: "uppercase",
              }}
            >
              {item.year}
            </p>
            <p
              style={{
                color: "#3A3A32",
                fontSize: "0.875rem",
                lineHeight: 1.65,
              }}
            >
              {item.event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Member Roll ──────────────────────────────────────────────────────────────
function MemberRoll() {
  // Group by group name
  const groups = {};
  allMembers.forEach((m) => {
    if (!groups[m.group]) groups[m.group] = [];
    groups[m.group].push(m.name);
  });

  const sortedGroups = Object.entries(groups).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedGroups.map(([group, names]) => (
        <div
          key={group}
          className="p-5"
          style={{ border: "1px solid #D4C9B0", background: "#F5F0E8" }}
        >
          <p
            className="mb-3"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "#8B6355",
              textTransform: "uppercase",
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
                  fontSize: "0.875rem",
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

export default function AboutPage() {
  return (
    <div style={{ background: "#F5F0E8", paddingTop: "48px" }}>
      {/* ── HERO ── */}
      <section
        style={{ borderBottom: "1px solid #D4C9B0", padding: "60px 0 80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
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
              Tentang Kami
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "#2D3A22",
                  lineHeight: 1.25,
                  marginBottom: "1.5rem",
                }}
              >
                Jagakarsa sebagai teks spasial yang terus ditulis ulang oleh
                waktu.
              </h1>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "#5A6B45",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}
              >
                Para petani kota di Kecamatan Jagakarsa yang selama ini telah
                menyiasati ruang, menjawab tantangan ruang berprofesi, dan
                menciptakan ruang sendiri dalam konteks pertanian kota.
              </p>
              <p
                style={{
                  color: "#5A6B45",
                  lineHeight: 1.75,
                  fontSize: "0.9rem",
                }}
              >
                Menanam di pekarangan sempit, menghidupkan lahan terlantar,
                membangun sistem produksi dari bawah tanpa menunggu izin atau
                anggaran dari atas.
              </p>
            </FadeIn>

            {/* Photo placeholder */}
            <FadeIn delay={0.15}>
              <div
                className="relative"
                style={{
                  background: "#EDE5D4",
                  border: "1px solid #D4C9B0",
                  aspectRatio: "4/3",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="w-16 h-16 mb-3 flex items-center justify-center"
                    style={{ border: "1px solid #D4C9B0" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-7 h-7"
                      style={{ color: "#8B9E7A" }}
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
                      fontSize: "9px",
                      color: "#8B9E7A",
                      letterSpacing: "0.12em",
                    }}
                  >
                    FOTO ARSIP JAGAKARSA
                  </p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-2"
                  style={{ background: "rgba(45,58,34,0.85)" }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      color: "#8B9E7A",
                      letterSpacing: "0.1em",
                    }}
                  >
                    JAGAKARSA, JAKARTA SELATAN · ARSIP KOMUNITAS
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── NARASI UTAMA ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <FadeIn>
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
                Tentang Majelis Sayur
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-2 space-y-5">
              <p
                style={{
                  color: "#3A3A32",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Majelis Sayur adalah para petani kota di Kecamatan Jagakarsa,
                Jakarta Selatan yang selama ini telah menyiasati ruang, menjawab
                tantangan ruang berprofesi, dan menciptakan ruang sendiri dalam
                konteks pertanian kota: menanam di pekarangan sempit,
                menghidupkan lahan terlantar, membangun sistem produksi dari
                bawah tanpa menunggu izin atau anggaran dari atas.
              </p>
              <p
                style={{
                  color: "#3A3A32",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Pada era tahun 1990–2000an wilayah Jagakarsa identik dengan
                Gabungan Kelompok Tani atau biasa dikenal dengan Gapoktan yang
                masing-masing memiliki hasil panen mereka sendiri — mengingat
                area kecamatan Jagakarsa dikenal sebagai daerah penghasil
                buah-buahan dan sayuran.
              </p>
              <p
                style={{
                  color: "#3A3A32",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Majelis Sayur diinisiasi sejak tahun 2021 adalah replika dari
                semangat para petani yang sudah dari dulu saling terhubung.
                Bagaimana petani-petani di zaman itu sudah saling bergotong
                royong, bekerja sama dan berbagi informasi hulu hilir mulai dari
                cara atau bagaimana menanam hingga cara mendistribusikan panen.
              </p>
              <p
                style={{
                  color: "#3A3A32",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Majelis Sayur diinisiasi sejak 2021 bermula dari kebutuhan
                sederhana namun mendesak: mendekatkan produsen kepada konsumen.
                Hadir sebagai jawaban praktis atas salah satu kontradiksi
                terbesar kota: kota yang membutuhkan pangan tetapi tidak tahu
                dari mana pangannya berasal.
              </p>

              {/* Pull quote */}
              <div className="mt-6 p-6" style={{ background: "#2D3A22" }}>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                    color: "#C4B99A",
                    lineHeight: 1.65,
                  }}
                >
                  "Seiring berjalannya waktu, Majelis Sayur Jagakarsa bertumbuh
                  melampaui fungsi pasar. Ia menjelma menjadi ruang musyawarah
                  sejajar — tempat para petani berkumpul, bertukar pikiran, dan
                  berbagi ilmu."
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#6B7F58",
                    letterSpacing: "0.12em",
                  }}
                >
                  — MAJELIS SAYUR JAGAKARSA
                </p>
              </div>

              <p
                style={{
                  color: "#3A3A32",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Di sinilah pengetahuan tentang budidaya, pengelolaan lahan,
                pengolahan pascapanen, dan strategi bertahan di tengah tekanan
                pembangunan kota dan kebijakan Pemerintah Kota yang kerap tidak
                berpihak pada praktik pertanian kota maupun ruang hijau kota,
                dipertukarkan secara horizontal, dari petani ke petani.
              </p>
              <p
                style={{
                  color: "#3A3A32",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Hari ini, Majelis Sayur Jagakarsa menantang dirinya dengan visi
                sulit: menjadi fondasi kedaulatan pangan kewilayahan yang
                berkelanjutan. Setiap kebun dan setiap petani diharapkan
                memiliki spesialisasi yang saling melengkapi — membentuk
                ekosistem pertanian terintegrasi yang saling menopang.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── JAGAKARSA: KONTEKS SPASIAL ── */}
      <section
        style={{
          padding: "80px 0",
          background: "#EDE5D4",
          borderBottom: "1px solid #D4C9B0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
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
                Jagakarsa
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  color: "#2D3A22",
                  lineHeight: 1.3,
                  marginBottom: "1.5rem",
                }}
              >
                Paru-paru Jakarta dan penjaga air daratan kota.
              </h2>
              <div className="space-y-4">
                <p
                  style={{
                    color: "#3A3A32",
                    lineHeight: 1.8,
                    fontSize: "0.9rem",
                  }}
                >
                  Jagakarsa adalah sebuah kecamatan di Jakarta Selatan yang
                  diresmikan secara mandiri terlepas dari kecamatan induknya,
                  Kecamatan Pasar Minggu. Ia termasuk salah satu dari kecamatan
                  dengan luas wilayah yang cukup besar di DKI Jakarta, 25 km².
                </p>
                <p
                  style={{
                    color: "#3A3A32",
                    lineHeight: 1.8,
                    fontSize: "0.9rem",
                  }}
                >
                  Dalam 20 tahun terakhir, Jagakarsa tidak lepas dari imbas
                  pembangunan Jakarta yang begitu cepat. Ruang-ruang hijau
                  berganti dengan berbagai macam gedung dan perumahan. Namun
                  demikian, posisinya sebagai wilayah paling hijau di Provinsi
                  Jakarta daratan tak tergantikan.
                </p>
                <p
                  style={{
                    color: "#3A3A32",
                    lineHeight: 1.8,
                    fontSize: "0.9rem",
                  }}
                >
                  Selain kawasan hijau, Jagakarsa juga adalah penjaga air untuk
                  daratan Jakarta. Di wilayah ini terdapat banyak situ air
                  sebagai penjaga keseimbangan air yang mengalir ke Jakarta —
                  menampung air sehingga tidak banyak debit yang menimbulkan
                  banjir.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { num: "25 km²", label: "Luas Kecamatan" },
                  { num: "11+", label: "Kebun Aktif" },
                  { num: "40+", label: "Warga Majelis" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-5"
                    style={{
                      background: "#F5F0E8",
                      border: "1px solid #D4C9B0",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: "#2D3A22",
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "9px",
                        color: "#8B6355",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: "4px",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <FadeIn>
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
                Sejarah
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#2D3A22",
                  lineHeight: 1.3,
                }}
              >
                Dari Gapoktan ke Majelis Sayur.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-2">
              <Timeline />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VISI ── */}
      <section
        style={{
          padding: "80px 0",
          background: "#2D3A22",
          borderBottom: "1px solid #3D4A2A",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#6B7F58",
                  textTransform: "uppercase",
                }}
              >
                Visi
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#F5F0E8",
                  lineHeight: 1.65,
                }}
              >
                Jagakarsa sebagai paru-paru ekologis dan penjaga air Jakarta.
                Setiap jengkal tanah yang tersisa adalah tanggung jawab bersama.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p
                className="mb-4"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#6B7F58",
                  textTransform: "uppercase",
                }}
              >
                Misi
              </p>
              <ul className="space-y-3">
                {[
                  "Menyiasati ruang sempit untuk produksi pangan komunitas",
                  "Mendidik generasi baru tentang agroekologi dan kedaulatan pangan",
                  "Membangun jaringan petani urban yang saling mendukung",
                  "Mendokumentasikan dan melestarikan pengetahuan pertanian lokal",
                  "Menjadi fondasi kedaulatan pangan kewilayahan yang berkelanjutan",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px",
                        color: "#6B7F58",
                        marginTop: "3px",
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      style={{
                        color: "#8B9E7A",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WARGA MAJELIS SAYUR ── */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #D4C9B0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
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
                  Warga Majelis Sayur
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "#2D3A22",
                    lineHeight: 1.2,
                  }}
                >
                  {allMembers.length} orang,{" "}
                  {
                    Object.keys(
                      allMembers.reduce((a, m) => ({ ...a, [m.group]: 1 }), {}),
                    ).length
                  }{" "}
                  kelompok.
                </h2>
              </div>
              <Link
                to="/farmer"
                className="hidden md:block text-xs transition-opacity hover:opacity-60"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "#5A6B45",
                  letterSpacing: "0.1em",
                }}
              >
                PROFIL LENGKAP →
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <MemberRoll />
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "60px 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#2D3A22",
                marginBottom: "0.5rem",
              }}
            >
              Kenali para petaninya.
            </h3>
            <p style={{ color: "#5A6B45", fontSize: "0.9rem" }}>
              Direktori arsip petani dan kolektif yang menjaga tanah Jagakarsa.
            </p>
          </div>
          <Link
            to="/farmer"
            className="flex-shrink-0 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: "#4A5E3A",
              color: "#F5F0E8",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Para Petani →
          </Link>
        </div>
      </section>
    </div>
  );
}
