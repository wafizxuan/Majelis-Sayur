import { useEffect, useRef } from 'react'

/**
 * SectionLeaves — Daun melayang ke atas dengan efek angin
 * Taruh di dalam section yang punya `position: relative` dan `overflow: hidden`
 * Canvas z-index: 0, konten section harus z-index >= 1
 */
export default function SectionLeaves({ count = 12 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const colors = ['#7CB518', '#4A7C59', '#5A9A30', '#3D7A20', '#A8C8A0']

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const leaves = Array.from({ length: count }, (_, i) => ({
      x:        Math.random() * window.innerWidth,
      y:        Math.random() * canvas.offsetHeight + canvas.offsetHeight,
      size:     Math.random() * 12 + 7,
      speedY:   -(Math.random() * 0.6 + 0.25),
      swayAmp:  Math.random() * 30 + 15,
      swayFreq: Math.random() * 0.015 + 0.008,
      swayOff:  Math.random() * Math.PI * 2,
      rot:      Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      color:    colors[i % colors.length],
      opacity:  Math.random() * 0.22 + 0.08,
      t:        Math.random() * 100,
    }))

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      leaves.forEach((leaf) => {
        leaf.t   += 1
        leaf.y   += leaf.speedY
        leaf.x   += Math.sin(leaf.t * leaf.swayFreq + leaf.swayOff) * 0.8
        leaf.rot += leaf.rotSpeed
        if (leaf.y < -30) {
          leaf.y = canvas.height + 30
          leaf.x = Math.random() * canvas.width
        }
        ctx.save()
        ctx.globalAlpha = leaf.opacity
        ctx.translate(leaf.x, leaf.y)
        ctx.rotate(leaf.rot)
        ctx.fillStyle = leaf.color
        ctx.beginPath()
        ctx.ellipse(0, 0, leaf.size * 0.45, leaf.size * 0.7, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = leaf.color
        ctx.globalAlpha = leaf.opacity * 0.5
        ctx.lineWidth = 0.7
        ctx.beginPath()
        ctx.moveTo(0, -leaf.size * 0.7)
        ctx.lineTo(0,  leaf.size * 0.7)
        ctx.stroke()
        ctx.restore()
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
