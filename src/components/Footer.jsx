import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function Footer() {
  const { t } = useTranslation()

  const navLinks = [
    { label: t('nav.home'),    to: '/' },
    { label: t('nav.about'),   to: '/about' },
    { label: t('nav.farmer'),  to: '/farmer' },
    { label: t('nav.catalog'), to: '/catalog' },
    { label: t('nav.events'),  to: '/events' },
    { label: t('nav.school'),  to: '/school' },
    { label: t('nav.network'), to: '/network' },
  ]

  return (
    <footer style={{ background: '#2D3A22', color: '#F5F0E8' }}>
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="font-serif font-black text-3xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#F5F0E8' }}
              >
                Majelis
              </span>
              <span
                className="font-serif font-black italic text-3xl px-2 py-0.5 ml-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", background: '#4A5E3A', color: '#F5F0E8' }}
              >
                Sayur
              </span>
            </div>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: '#8B9E7A', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
            >
              {t('footer.tagline')}
            </p>

            <p className="text-xs leading-relaxed max-w-xs" style={{ color: '#6B7F58' }}>
              Jl. Durian No.30A, RT.4/RW.4<br />
              Jagakarsa, Jakarta Selatan 12620<br />
              Indonesia
            </p>

            <div className="flex gap-3 mt-6">
              <a 
                href="https://instagram.com/majelissayur" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2 transition-colors hover:opacity-70"
                style={{ border: '1px solid #4A5E3A' }}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace", color: '#6B7F58', letterSpacing: '0.15em' }}
            >
              {t('footer.nav')}
            </p>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors hover:text-cream"
                    style={{ color: '#8B9E7A' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="text-xs mb-4 uppercase tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace", color: '#6B7F58', letterSpacing: '0.15em' }}
            >
              {t('footer.contact')}
            </p>
            <ul className="space-y-3">
              <li>
                <p className="text-xs mb-0.5" style={{ color: '#6B7F58', fontFamily: "'DM Mono', monospace" }}>EMAIL</p>
                <a href="mailto:ngukngakofc@gmail.com" className="text-sm hover:text-cream transition-colors" style={{ color: '#8B9E7A' }}>
                  ngukngakofc@gmail.com
                </a>
              </li>
              <li>
                <p className="text-xs mb-0.5" style={{ color: '#6B7F58', fontFamily: "'DM Mono', monospace" }}>WHATSAPP</p>
                <a href="https://wa.me/6281498365377" className="text-sm hover:text-cream transition-colors" style={{ color: '#8B9E7A' }}>
                  +62 814 9836 5377
                </a>
              </li>
              <li>
                <p className="text-xs mb-0.5" style={{ color: '#6B7F58', fontFamily: "'DM Mono', monospace" }}>KOLABORASI</p>
                <a href="https://gudskul.art/" target="_blank" rel="noopener noreferrer"
                  className="text-sm hover:text-cream transition-colors" style={{ color: '#8B9E7A' }}>
                  Gudskul Ekosistem
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-2"
        style={{ borderTop: '1px solid #3D4A2A' }}
      >
        <p className="text-xs" style={{ color: '#4A5E3A', fontFamily: "'DM Mono', monospace" }}>
          © {new Date().getFullYear()} Majelis Sayur · Jagakarsa, Jakarta Selatan
        </p>
        <p className="text-xs" style={{ color: '#4A5E3A', fontFamily: "'DM Mono', monospace" }}>
          Built by Ngukngak
        </p>
      </div>
    </footer>
  )
}
