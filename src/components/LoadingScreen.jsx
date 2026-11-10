import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('visible')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let startTime = Date.now()
    const duration = 2000 // 2 seconds
    let rafId = null
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress < 100) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }
    
    rafId = requestAnimationFrame(updateProgress)
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setPhase('fading')
        setTimeout(() => { setPhase('done'); onDone?.() }, 700)
      }, 400)
    }
  }, [progress, onDone])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#F5F0E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.7s ease',
        opacity: phase === 'fading' ? 0 : 1,
        pointerEvents: phase === 'fading' ? 'none' : 'all',
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '200px 200px', opacity: 0.04,
      }} />

      {/* Logo */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        {/* Small label */}
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#5A6B45',
          marginBottom: '1rem',
        }}>
          Jagakarsa · Jakarta Selatan
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
          color: '#2D3A22',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          Majelis
        </h1>
        <div style={{
          display: 'inline-block',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
          color: '#F5F0E8',
          backgroundColor: '#4A5E3A',
          padding: '0 20px 8px',
          lineHeight: 1.1,
          marginTop: '4px',
        }}>
          Sayur
        </div>

        <p style={{
          marginTop: '1.5rem',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          color: '#5A6B45',
          fontSize: '0.9rem',
          letterSpacing: '0.02em',
        }}>
          Menyiasati Ruang, Menanam Kedaulatan.
        </p>
      </div>

      {/* Progress */}
      <div style={{
        width: 'min(240px, 55vw)',
        height: '1px',
        backgroundColor: '#D4C9B0',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          height: '100%',
          width: `${Math.min(progress, 100)}%`,
          backgroundColor: '#4A5E3A',
          transition: 'width 0.12s ease',
        }} />
      </div>

      <p style={{
        marginTop: '1rem',
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.6rem',
        color: '#8B6355',
        letterSpacing: '0.15em',
      }}>
        {Math.min(Math.floor(progress), 100).toString().padStart(3, '0')}
      </p>
    </div>
  )
}
