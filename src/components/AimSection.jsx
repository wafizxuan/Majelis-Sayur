import { useRef, useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * DATA DUMMY — ganti dengan fetch dari API /api/aims atau CMS
 */
const aimCards = [
  {
    id: 1,
    color: '#7CB518',
    textColor: '#ffffff',
    title: "Belajar Bertani",
    body: "MajelisSayur hadir sebagai ruang belajar bagi siapa saja yang ingin memulai perjalanan bertani di lingkungan urban. Tidak perlu lahan luas — cukup niat dan pot kecil di jendela rumah.",
    body2: "Kami percaya bahwa setiap orang bisa berkontribusi pada kedaulatan pangan, dimulai dari lingkungan terkecil mereka sendiri.",
  },
  {
    id: 2,
    color: '#F5C518',
    textColor: '#1A2E05',
    title: "Tumbuh Bersama",
    body: "Komunitas kami menghubungkan ratusan petani urban dari berbagai latar belakang. Dari ibu rumah tangga hingga mahasiswa arsitektur — semua punya tempat di sini.",
    body2: "Dengan pendekatan inklusif, kami menyediakan edukasi, jaringan, dan dukungan praktis agar setiap anggota bisa berkembang.",
  },
  {
    id: 3,
    color: '#B8D4E8',
    textColor: '#1A2E05',
    title: "Kedaulatan Pangan",
    body: "Visi kami adalah kota yang mandiri secara pangan. Setiap kebun kecil di balkon, atap, atau halaman rumah adalah kontribusi nyata untuk masa depan yang lebih baik.",
    body2: "Bersama komunitas, kita buktikan bahwa urban farming bukan sekadar hobi — ini adalah gerakan.",
  },
  {
    id: 4,
    color: '#1A2E05',
    textColor: '#ffffff',
    title: "Inovasi & Riset",
    body: "Kami berkolaborasi dengan institusi akademik untuk mengembangkan teknik bertani terbaik yang sesuai dengan kondisi perkotaan Indonesia.",
    body2: "Dari hidroponik hingga aquaponik, dari kompos rumahan hingga kebun vertikal — kami terus berinovasi.",
  },
  {
    id: 5,
    color: '#E8EDF0',
    textColor: '#1A2E05',
    title: "Kebun Percontohan",
    body: "Akses ke kebun demonstrasi komunitas untuk belajar langsung teknik bertani di lahan sempit. Lihat sendiri bagaimana balkon 2×3 meter bisa menghasilkan sayur untuk sekeluarga.",
    body2: "Kunjungi kebun kami setiap akhir pekan dan bawa pulang ilmu serta bibit gratis.",
  },
  {
    id: 6,
    color: '#A8C8E8',
    textColor: '#1A2E05',
    title: "Program Sosial",
    body: "Setiap panen, sebagian hasil kebun komunitas kami donasikan untuk keluarga kurang mampu di sekitar Jagakarsa dan Pasar Minggu.",
    body2: "Bertani bukan hanya untuk diri sendiri — ini tentang berbagi dan membangun solidaritas pangan.",
  },
  {
    id: 7,
    color: '#4A7C59',
    textColor: '#ffffff',
    title: "Bergabung Sekarang",
    body: "Sudah siap memulai? Komunitas MajelisSayur terbuka untuk semua — tidak ada syarat khusus, tidak ada biaya pendaftaran.",
    body2: "Cukup datang dengan semangat dan keinginan untuk belajar. Kami siap menyambut Anda.",
  },
]

// ─── Card kalender dengan animasi flip ───────────────────────────────────────
function CalendarCard({ card, state }) {
  const style = {
    position: 'absolute',
    inset: 0,
    backgroundColor: card.color,
    borderRadius: '1rem',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    transformOrigin: 'top center',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
    willChange: 'transform, opacity',
    ...(state === 'above'  && { transform: 'rotateX(-180deg)', opacity: 0, zIndex: 1 }),
    ...(state === 'active' && { transform: 'rotateX(0deg)',    opacity: 1, zIndex: 2 }),
    ...(state === 'below'  && { transform: 'translateY(32px)', opacity: 0, zIndex: 0 }),
  }

  return (
    <div style={style}>
      {/* Nomor */}
      <div style={{
        position: 'absolute', top: '1rem', right: '1.25rem',
        fontSize: '0.65rem', fontWeight: 700, opacity: 0.35,
        color: card.textColor, letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {String(card.id).padStart(2, '0')} / {String(aimCards.length).padStart(2, '0')}
      </div>
      <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 900, color: card.textColor, lineHeight: 1.1, marginTop: '0.25rem' }}>
        {card.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: card.textColor, opacity: 0.85, lineHeight: 1.75 }}>{card.body}</p>
      <p style={{ fontSize: '0.875rem', color: card.textColor, opacity: 0.65, lineHeight: 1.75 }}>{card.body2}</p>
    </div>
  )
}

// ─── Zipper interaktif ────────────────────────────────────────────────────────
function InteractiveZipper({ activeIdx, onChange }) {
  const trackRef  = useRef(null)
  const [dragging, setDragging] = useState(false)

  const TRACK_H   = 300   // tinggi visual track (px)
  const N         = aimCards.length
  // posisi dot per card: 0 = atas, TRACK_H = bawah
  const dotPositions = aimCards.map((_, i) => (i / (N - 1)) * TRACK_H)
  const thumbY    = dotPositions[activeIdx]
  const filledPct = (activeIdx / (N - 1)) * 100

  // Hitung index dari posisi Y dalam track
  const yToIndex = useCallback((clientY) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return 0
    const relY    = clientY - rect.top
    const clamped = Math.max(0, Math.min(TRACK_H, relY))
    const ratio   = clamped / TRACK_H
    return Math.round(ratio * (N - 1))
  }, [N])

  // ── Mouse events ──
  const onMouseDown = (e) => {
    e.preventDefault()
    setDragging(true)
    onChange(yToIndex(e.clientY))
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => onChange(yToIndex(e.clientY))
    const onUp   = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [dragging, yToIndex, onChange])

  // ── Touch events ──
  const onTouchStart = (e) => {
    setDragging(true)
    onChange(yToIndex(e.touches[0].clientY))
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => onChange(yToIndex(e.touches[0].clientY))
    const onEnd  = () => setDragging(false)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend',  onEnd)
    return () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend',  onEnd)
    }
  }, [dragging, yToIndex, onChange])

  return (
    <div
      className="hidden lg:flex flex-col items-center select-none"
      style={{ width: '3rem', position: 'relative', margin: '0 2rem' }}
    >
      {/* Hint teks */}
      <p style={{
        fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#8FA3A8', marginBottom: '0.75rem', fontWeight: 600,
      }}>
        drag
      </p>

      {/* Track area — klik di mana saja untuk pindah */}
      <div
        ref={trackRef}
        style={{ position: 'relative', height: `${TRACK_H}px`, width: '100%', cursor: 'pointer' }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Track belakang abu */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: 0, bottom: 0, width: '2px',
          backgroundColor: '#C8D8E0', borderRadius: '9999px',
        }} />

        {/* Track terisi hijau */}
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: 0, width: '2px',
          height: `${filledPct}%`,
          backgroundColor: '#7CB518', borderRadius: '9999px',
          transition: 'height 0.25s ease',
        }} />

        {/* Titik snap per card */}
        {dotPositions.map((y, i) => {
          const passed = i <= activeIdx
          return (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); onChange(i) }}
              style={{
                position: 'absolute',
                left: '50%', top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                width: i === activeIdx ? '12px' : '8px',
                height: i === activeIdx ? '12px' : '8px',
                borderRadius: '50%',
                backgroundColor: passed ? '#7CB518' : '#ffffff',
                border: `2px solid ${passed ? '#7CB518' : '#C8D8E0'}`,
                transition: 'all 0.25s ease',
                zIndex: 2,
                cursor: 'pointer',
              }}
            />
          )
        })}

        {/* Thumb besar yang bisa di-drag */}
        <div
          style={{
            position: 'absolute',
            left: '50%', top: `${thumbY}px`,
            transform: 'translate(-50%, -50%)',
            width: '22px', height: '22px',
            borderRadius: '50%',
            backgroundColor: '#7CB518',
            border: '3px solid #ffffff',
            boxShadow: dragging
              ? '0 0 0 4px rgba(124,181,24,0.3)'
              : '0 0 0 2px rgba(124,181,24,0.2)',
            transition: dragging ? 'none' : 'top 0.25s ease, box-shadow 0.2s ease',
            zIndex: 3,
            cursor: dragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        />
      </div>

      {/* Label index */}
      <p style={{
        fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#8FA3A8', marginTop: '0.75rem', fontWeight: 600,
      }}>
        {activeIdx + 1} / {N}
      </p>
    </div>
  )
}

// ─── Mobile: tombol navigasi sederhana ───────────────────────────────────────
function MobileNav({ activeIdx, onChange }) {
  return (
    <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
      <button
        onClick={() => onChange(Math.max(0, activeIdx - 1))}
        disabled={activeIdx === 0}
        className="w-9 h-9 rounded-full border border-border-soft flex items-center justify-center disabled:opacity-30 hover:bg-sky-light transition-colors"
        aria-label="Sebelumnya"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M10 4l-4 4 4 4" stroke="#1A2E05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {aimCards.map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          style={{
            width: i === activeIdx ? '1.5rem' : '0.5rem',
            height: '0.5rem',
            borderRadius: '9999px',
            backgroundColor: i === activeIdx ? '#7CB518' : '#C8D8E0',
            transition: 'all 0.25s ease',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label={`Card ${i + 1}`}
        />
      ))}

      <button
        onClick={() => onChange(Math.min(aimCards.length - 1, activeIdx + 1))}
        disabled={activeIdx === aimCards.length - 1}
        className="w-9 h-9 rounded-full border border-border-soft flex items-center justify-center disabled:opacity-30 hover:bg-sky-light transition-colors"
        aria-label="Berikutnya"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M6 4l4 4-4 4" stroke="#1A2E05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

// ─── AimSection utama ─────────────────────────────────────────────────────────
export default function AimSection() {
  const { t } = useTranslation()
  const [activeIdx, setActiveIdx] = useState(0)
  const cards = t('aim.cards', { returnObjects: true })

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center">

          {/* ── KIRI: teks ── */}
          <div className="pr-0 lg:pr-12">
            <h2 className="text-4xl sm:text-5xl font-black text-dark-green leading-tight mb-8">
              {t('aim.title1')}{' '}
              <span className="italic" style={{ backgroundColor: '#F5C518', padding: '0 6px 2px', fontFamily: 'Georgia, serif' }}>
                {t('aim.title2')}
              </span>
              <br />
              {t('aim.title3')}
            </h2>

            <div className="space-y-4 text-dark-green/65 text-sm leading-relaxed">
              <p>{t('aim.desc1')}</p>
              <p>{t('aim.desc2')}</p>
            </div>

            {/* Mobile nav */}
            <MobileNav activeIdx={activeIdx} onChange={setActiveIdx} />
          </div>

          {/* ── TENGAH: zipper interaktif ── */}
          <InteractiveZipper activeIdx={activeIdx} onChange={setActiveIdx} />

          {/* ── KANAN: stack card kalender ── */}
          <div
            className="mt-8 lg:mt-0"
            style={{ position: 'relative', height: 'min(400px, 70vw, 480px)', perspective: '1200px' }}
          >
            {aimCards.map((card, i) => {
              const translatedCard = { ...card, ...(cards[i] || {}) }
              const state =
                i < activeIdx   ? 'above'  :
                i === activeIdx ? 'active' : 'below'
              return <CalendarCard key={card.id} card={translatedCard} state={state} />
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
