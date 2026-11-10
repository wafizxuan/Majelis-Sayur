import { useState } from 'react'
import { Link } from 'react-router-dom'
import { farmerLocations } from '../data/farmerLocations'

// ─── Kebun Card for Kelas Singkat ─────────────────────────────────────────────
function KebunCard({ loc, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ border: '1px solid #D4C9B0', background: '#F5F0E8' }}>
      <button
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start gap-4">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#8B6355', flexShrink: 0, marginTop: '3px' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: '#2D3A22', marginBottom: '2px' }}>
              {loc.name}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {loc.learning}
            </p>
          </div>
        </div>
        <span style={{ color: '#5A6B45', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid #D4C9B0' }}>
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p style={{ color: '#3A3A32', lineHeight: 1.75, fontSize: '0.875rem' }}>
                {loc.desc}
              </p>
              {loc.story && (
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '0.875rem', color: '#5A6B45', lineHeight: 1.65 }}>
                  "{loc.story}"
                </p>
              )}
            </div>
            <div className="space-y-3">
              {[
                { label: 'FASILITATOR', value: loc.farmer },
                { label: 'ALAMAT', value: loc.address },
                { label: 'JADWAL', value: loc.schedule },
                { label: 'PESERTA', value: loc.maxParticipants },
                { label: 'KONTAK', value: loc.contact },
                { label: 'INSTAGRAM', value: loc.instagram },
              ].filter(i => i.value).map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#8B6355', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {item.label}
                  </p>
                  <p style={{ color: '#2D3A22', fontSize: '0.8rem' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Pilar Card ───────────────────────────────────────────────────────────────
function PilarCard({ number, title, subjects }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid #D4C9B0', background: '#F5F0E8' }}>
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
            PILAR {String(number).padStart(2, '0')}
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, color: '#2D3A22', lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>
        <span style={{ color: '#5A6B45', fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5" style={{ borderTop: '1px solid #D4C9B0' }}>
          <p className="pt-3 mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            SUBJEK BELAJAR
          </p>
          <ul className="space-y-1.5">
            {subjects.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: '#8B6355', fontSize: '10px', marginTop: '3px', flexShrink: 0 }}>·</span>
                <p style={{ color: '#3A3A32', fontSize: '0.85rem', lineHeight: 1.5 }}>{s}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const pilars = [
  {
    number: 1,
    title: "Pendidikan",
    desc: "Ruang belajar agroekologi tempat Sekolah Tani Kota berada. Berfokus pada pemahaman kondisi urban, ekologi kota, dan melihat kemungkinan bertani di konteks kota.",
    subjects: [
      "Air, Tanah, Udara, dan Cahaya Urban",
      "Jagakarsa sebagai Zona Hidrologis",
      "Keanekaragaman Hayati Urban",
      "Petani Kota dan Ekologi Urban",
      "Bengkel Kerja: Workshop Inovasi Spasial",
    ],
  },
  {
    number: 2,
    title: "Produksi",
    desc: "Peserta diajak memikirkan keberlanjutan praktik pertanian kota secara langsung melalui perancangan kebun serta budidaya tanaman dan perikanan air tawar.",
    subjects: [
      "Praktik Spasial & Perencanaan Kebun",
      "Budidaya Sayuran dan Buah Serta Pengetahuan Siklusnya",
      "Pengetahuan Budidaya Ikan Air Tawar",
    ],
  },
  {
    number: 3,
    title: "Ekonomi",
    desc: "Mengembangkan kemandirian ekonomi melalui model ekonomi sirkular, inovasi produk, peluang bisnis pertanian kota, standar keamanan pangan, serta pemahaman dimensi sosialnya.",
    subjects: [
      "Ekonomi Sirkular Jagakarsa",
      "Bengkel Kerja: Inovasi Produk",
      "Bengkel Kerja: Peluang Bisnis Pertanian Kota",
      "Bengkel Kerja: Standar Keamanan Pangan",
      "Bengkel Kerja: Dimensi Sosial Pertanian Kota",
    ],
  },
  {
    number: 4,
    title: "Advokasi",
    desc: "Pertanian kota adalah praktek minor di tengah beragam praktek lain di konteks urban. Terkadang, bahkan kerapnya, praktek pertanian kota tersingkirkan oleh praktek-praktek perebutan lahan lainnya.",
    subjects: [
      "Mengadvokasi Perencanaan yang Partisipatif",
      "Strategi Penyelarasan Kebijakan",
    ],
  },
  {
    number: 5,
    title: "Budaya",
    desc: "Pentingnya memahami ruang urban serta bagaimana krisis yang tengah dialami masyarakat urban hari ini, khususnya di konteks Jagakarsa dan Jakarta melalui sejarah dan memori.",
    subjects: [
      "Sejarah Ruang: Jagakarsa dalam Konteks Perubahan Jakarta",
      "Rekonstruksi Ruang dan Memori Jagakarsa",
      "Keanekaragaman Budaya di Dalam Ruang Kota",
      "Krisis Urban dan Ketegangan Pembangunan",
    ],
  },
]

// Kebun yang masuk program Laboratorium (subset dari farmerLocations)
const labKebunIds = [7, 8, 9, 10, 5, 6, 11] // Babe Zaenal, Emeng, KTH, SMKN, Tani Alit, Maisa, Selarasa

export default function SchoolPage() {
  const labKebun = farmerLocations.filter(l => labKebunIds.includes(l.id))
  const kelasKebun = farmerLocations.filter(l => [1, 2, 3, 4, 5, 6].includes(l.id))

  return (
    <div style={{ background: '#F5F0E8', paddingTop: '48px' }}>

      {/* ── Header ── */}
      <section style={{ padding: '60px 0 80px', borderBottom: '1px solid #D4C9B0', background: '#2D3A22' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="mb-4" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#6B7F58', textTransform: 'uppercase' }}>
            Sekolah Tani Kota · by Majelis Sayur Jagakarsa
          </p>
          <h1 className="mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.2, maxWidth: '640px' }}>
            Kurikulum Hidup untuk Kota yang Berdaulat
          </h1>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1rem', color: '#8B9E7A', lineHeight: 1.75, maxWidth: '560px' }}>
            Bukan sekolah formal. Ini laboratorium hidup, panduan lapangan, dan zine ekologis. Kurikulum ini hendak menjadikan Jagakarsa bukan sekadar latar belakang, melainkan laboratorium hidup: setiap gang, atap, setu, pekarangan, pinggiran sungai dan empang adalah ruang belajar yang nyata.
          </p>
        </div>
      </section>

      {/* ── Pengantar ── */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #D4C9B0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <p className="mb-4" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#8B6355', textTransform: 'uppercase' }}>
                Sekadar Pengantar
              </p>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <p style={{ color: '#3A3A32', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Kurikulum ini dirancang bukan hanya untuk memperkenalkan praktik bercocok tanam di lingkungan perkotaan, tetapi juga untuk menumbuhkan kesadaran ekologis, memperkuat kedaulatan pangan lokal, serta membangun keterhubungan antara warga berdasarkan kelas-kelas berbasis keahlian para petani Jagakarsa.
              </p>
              <p style={{ color: '#3A3A32', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Majelis Sayur Jagakarsa percaya bahwa fungsi utama dan pertama berkebun adalah untuk memenuhi kebutuhan paling dasar manusia. Namun demikian, bertani di dalam konteks pertanian kota bisa menjadi ruang terapi hingga alternatif ekonomi, sebagaimana yang dipraktikkan dan dialami para anggota Majelis Sayur Jagakarsa selama ini.
              </p>
              <p style={{ color: '#3A3A32', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Pada Kurikulum Sekolah Tani Kota ini disajikan dua jenis pembelajaran: <strong>Kelas Singkat Petani Kota</strong> dan <strong>Laboratorium Petani Kota</strong>. Meski para peserta bisa memilih antara keduanya, namun bagi Majelis Sayur Jagakarsa, keduanya terintegrasi dan saling melengkapi.
              </p>
              <div className="p-5" style={{ background: '#EDE5D4', border: '1px solid #D4C9B0' }}>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#2D3A22', lineHeight: 1.65 }}>
                  "Tanpa rasa cinta, mustahil menjadi penggerak. Tanpa penggerak, rasa cinta pada pertanian urban akan berusia hanya seumur jagung."
                </p>
                <p className="mt-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', letterSpacing: '0.1em' }}>
                  — MAJELIS SAYUR JAGAKARSA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 PILAR UTAMA ── */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #D4C9B0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#8B6355', textTransform: 'uppercase' }}>
                Gerakan Majelis Sayur
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#2D3A22', lineHeight: 1.25 }}>
                Lima Pilar Utama
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p style={{ color: '#3A3A32', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Seluruh kerja Majelis Sayur Jagakarsa berdiri di atas lima pilar gerakan yang saling menopang. Pilar-pilar ini bukan urutan linear, melainkan ekosistem yang bekerja secara spiral — saling mengisi dan memperkuat satu sama lain dalam praktik pertanian kota sehari-hari.
              </p>
            </div>
          </div>

          {/* Pilar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-parchment/65 border border-parchment rounded-lg overflow-hidden">
            {pilars.slice(0, 3).map((p) => (
              <div key={p.number} className="bg-cream-paper p-8 hover:bg-cream-dark/40 transition-colors duration-300">
                <div className="flex items-baseline justify-between mb-5">
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    PILAR {String(p.number).padStart(2, '0')}
                  </span>
                  {p.number === 1 && (
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5F0E8', background: '#4A5E3A', padding: '2px 6px' }}>
                      Sekolah Tani Kota
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#2D3A22', lineHeight: 1.25, marginBottom: '0.75rem' }}>
                  {p.title}
                </h3>
                <p style={{ color: '#5A6B45', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {p.desc}
                </p>
                <ul className="space-y-1.5">
                  {p.subjects.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#8B6355', fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>·</span>
                      <p style={{ color: '#3A3A32', fontSize: '0.8rem', lineHeight: 1.5 }}>{s}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-parchment/65 border border-parchment rounded-lg overflow-hidden lg:max-w-[66.6666%] lg:mx-auto mt-4">
            {pilars.slice(3, 5).map((p) => (
              <div key={p.number} className="bg-cream-paper p-8 hover:bg-cream-dark/40 transition-colors duration-300">
                <div className="flex items-baseline justify-between mb-5">
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    PILAR {String(p.number).padStart(2, '0')}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#2D3A22', lineHeight: 1.25, marginBottom: '0.75rem' }}>
                  {p.title}
                </h3>
                <p style={{ color: '#5A6B45', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {p.desc}
                </p>
                <ul className="space-y-1.5">
                  {p.subjects.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#8B6355', fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>·</span>
                      <p style={{ color: '#3A3A32', fontSize: '0.8rem', lineHeight: 1.5 }}>{s}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KELAS SINGKAT PETANI KOTA ── */}
      <section style={{ padding: '80px 0', background: '#EDE5D4', borderBottom: '1px solid #D4C9B0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
            <div>
              <p className="mb-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#8B6355', textTransform: 'uppercase' }}>
                Program 01
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#2D3A22', lineHeight: 1.2 }}>
                Kelas Singkat Petani Kota
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p style={{ color: '#3A3A32', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Program inspirasi untuk belajar pertanian kota melalui kunjungan dan belajar langsung ke kebun fasilitator. Peserta mendapatkan pengalaman langsung bersama petani Jagakarsa — melihat, menyentuh, dan memahami ekosistem kebun dari dekat.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {kelasKebun.map((loc, i) => (
              <KebunCard key={loc.id} loc={loc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LABORATORIUM PETANI KOTA ── */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #D4C9B0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div>
              <p className="mb-2" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#8B6355', textTransform: 'uppercase' }}>
                Program 02
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#2D3A22', lineHeight: 1.2 }}>
                Laboratorium Petani Kota
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <p style={{ color: '#3A3A32', lineHeight: 1.8, fontSize: '0.9rem' }}>
                Program residensi 6 bulan yang intensif untuk mencetak penggerak tani kota melalui 5 pilar kurikulum. Program ini berangkat dari pengalaman dan semangat dari para petani Majelis Sayur Jagakarsa — melestarikan, menyiapkan, dan mendorong individu atau kelompok yang siap mendedikasikan kerjanya untuk terwujudnya pertanian kota.
              </p>
              <p style={{ color: '#3A3A32', lineHeight: 1.8, fontSize: '0.9rem' }}>
                Kelima pilar kurikulum disusun secara spiral — bukan linear — sehingga setiap topik terus didalami dan dikontekstualisasikan kembali sepanjang program berlangsung.
              </p>
              {/* Peserta info */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'PESERTA', value: '5–7 orang' },
                  { label: 'USIA', value: '20–45 tahun' },
                  { label: 'DURASI', value: '6 bulan' },
                ].map((s) => (
                  <div key={s.label} className="p-4" style={{ background: '#EDE5D4', border: '1px solid #D4C9B0' }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#8B6355', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {s.label}
                    </p>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: '#2D3A22' }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pilar — Accordion detail view */}
          <div className="mb-8">
            <p className="mb-4" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#8B6355', textTransform: 'uppercase' }}>
              Detail Lima Pilar Kurikulum
            </p>
            <div className="space-y-2">
              {pilars.map((p) => (
                <PilarCard key={p.number} {...p} />
              ))}
            </div>
          </div>

          {/* Presentasi Akhir */}
          <div className="p-6" style={{ background: '#2D3A22' }}>
            <p className="mb-3" style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#6B7F58', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Presentasi Akhir
            </p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', color: '#F5F0E8', lineHeight: 1.65, marginBottom: '0.75rem' }}>
              Setelah menjalankan kelima pilar, peserta akan didorong untuk membuat Presentasi Akhir — sebentuk perayaan akan Panenan Ilmu dan Panenan Hasil Bumi Urban.
            </p>
            <p style={{ color: '#8B9E7A', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Bentuk panenan bermacam-macam: bisa festival, pameran, bazaar, dan lain sebagainya. Setelah Presentasi Akhir, Majelis Sayur akan terus mendampingi peserta selama 6 bulan hingga 1 tahun.
            </p>
          </div>
        </div>
      </section>

      {/* ── Daftar Fasilitator ── */}
      <section style={{ padding: '80px 0', background: '#EDE5D4', borderBottom: '1px solid #D4C9B0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="mb-8" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#8B6355', textTransform: 'uppercase' }}>
            Daftar Fasilitator
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Abdul Latief",          kebun: "Kebun Pojok Aselih" },
              { name: "Udi Husodo",             kebun: "Kolektif Hijau & Kebun Pojok Aselih" },
              { name: "Sophia Louretta",        kebun: "Kebun Tani Alit" },
              { name: "Ibnuh Hazar",            kebun: "Kebun Young Sayur" },
              { name: "Ahmad Fahrizal",         kebun: "Kelompok Tani Sejahtera Makmur" },
              { name: "Arief Adjir",            kebun: "Kebun Latar Babe" },
              { name: "Nurul Rachman",          kebun: "Kebun SMKN 63 Jakarta" },
              { name: "Arief Darmawan",         kebun: "Kebun SMKN 63 Jakarta" },
              { name: "Valmaisa Jazila & Ibu Irta", kebun: "Kebun Maisa Petani" },
              { name: "Hamzah Abdullah",        kebun: "Kelompok Tani Hutan Kumbang" },
              { name: "Pak Zaenal Abidin",      kebun: "Kelompok Peduli Ciliwung Kedung Sahong" },
              { name: "Lily Almasih",           kebun: "Kebun Emeng" },
              { name: "Juli Berskema",          kebun: "Selarasa Jagakarsa Foodlab" },
            ].map((f, i) => (
              <div key={i} className="p-4 flex items-start gap-3" style={{ background: '#F5F0E8', border: '1px solid #D4C9B0' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8B6355', flexShrink: 0, marginTop: '3px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.9rem', fontWeight: 700, color: '#2D3A22' }}>
                    {f.name}
                  </p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#8B6355', letterSpacing: '0.08em', marginTop: '2px' }}>
                    {f.kebun}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '60px 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#2D3A22', marginBottom: '0.5rem' }}>
              Tertarik bergabung?
            </h3>
            <p style={{ color: '#5A6B45', fontSize: '0.9rem' }}>
              Hubungi kami untuk informasi pendaftaran Kelas Singkat atau Laboratorium Petani Kota.
            </p>
          </div>
          <a
            href="https://wa.me/6281498365377"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: '#4A5E3A', color: '#F5F0E8', fontFamily: "'DM Sans', sans-serif" }}
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
