import { useState, useMemo } from 'react'
import { networkPartners, networkCategories } from '../data/network'

export default function NetworkPage() {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'direktori'
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and group partners for the classified grid
  const groupedPartners = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    const filteredList = networkPartners.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )

    const groups = {}
    networkCategories.forEach(cat => {
      if (cat !== 'Semua') {
        groups[cat] = []
      }
    })

    filteredList.forEach(p => {
      if (groups[p.category]) {
        groups[p.category].push(p)
      }
    })

    // Return categories that have matching collaborators
    return Object.entries(groups)
      .filter(([_, items]) => items.length > 0)
      .map(([category, items], index) => ({
        category,
        items,
        // Assign formal double-digit order number
        orderNo: String(index + 1).padStart(2, '0')
      }))
  }, [searchQuery])

  // Flat alphabetized list for directory view
  const alphabetizedPartners = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    const filteredList = networkPartners.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )

    return [...filteredList].sort((a, b) => a.name.localeCompare(b.name))
  }, [searchQuery])

  const totalFilteredCount = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    return networkPartners.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ).length
  }, [searchQuery])

  const featured = useMemo(() => networkPartners.filter(p => p.featured), [])

  return (
    <div className="bg-cream pt-12 min-h-screen">

      {/* ── Header ── */}
      <section className="py-16 border-b border-parchment bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="mb-3 text-[10px] tracking-[0.2em] text-soil-light font-mono uppercase">
            Jaringan
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-moss-dark leading-tight">
                Jejaring Kolaborator
              </h1>
              <p className="mt-2 text-xs text-soil-light font-mono tracking-wider uppercase">
                OUR NETWORK & PARTNERS
              </p>
            </div>
            <p className="text-moss-light text-sm md:text-base leading-relaxed max-w-lg">
              {networkPartners.length}+ kolaborator aktif yang terhubung dalam ekosistem Majelis Sayur — bersinergi menciptakan kedaulatan pangan, seni kolektif, budaya, dan riset perkotaan yang berkelanjutan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured partners — high-end editorial collage ── */}
      <section className="py-12 border-b border-parchment bg-cream-dark/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <p className="mb-6 text-[9px] tracking-[0.2em] text-soil-light font-mono uppercase">
            ★ MITRA UTAMA
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-5">
            {featured.map((p) => (
              <a
                key={p.name}
                href={p.url || '#'}
                target={p.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-all duration-300 hover:opacity-85 text-decoration-none"
              >
                <span className="font-serif text-xl sm:text-2xl font-bold text-moss-dark group-hover:text-moss transition-colors">
                  {p.name}
                </span>
                {p.url && (
                  <span className="text-xs text-soil-light/60 group-hover:text-moss group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all font-mono">
                    ↗
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter, Search & Directory Grid ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-parchment/40">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-soil-light">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kolaborator atau klasifikasi..."
                className="w-full pl-9 pr-10 py-2.5 text-xs bg-cream-paper border border-parchment text-ink focus:outline-none focus:border-moss focus:ring-1 focus:ring-moss/30 transition-all rounded"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-soil-light/60 hover:text-moss"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>

            {/* Switcher */}
            <div className="flex items-center justify-between md:justify-end gap-6">
              <span className="text-[10px] text-soil-light font-mono tracking-wider uppercase">
                {totalFilteredCount} KOLABORATOR
              </span>
              
              <div className="inline-flex bg-cream-dark p-0.5 border border-parchment rounded">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-moss text-cream rounded shadow-sm'
                      : 'text-moss-light hover:text-moss'
                  }`}
                >
                  Grid Klasifikasi
                </button>
                <button
                  onClick={() => setViewMode('direktori')}
                  className={`px-4 py-1.5 text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                    viewMode === 'direktori'
                      ? 'bg-moss text-cream rounded shadow-sm'
                      : 'text-moss-light hover:text-moss'
                  }`}
                >
                  Semua Direktori
                </button>
              </div>
            </div>
          </div>

          {/* ── VIEW 1: Grouped Architectural Grid (Dentsu/Merkle Style) ── */}
          {viewMode === 'grid' && (
            groupedPartners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-parchment/65 border border-parchment rounded-lg overflow-hidden">
                {groupedPartners.map(({ category, items, orderNo }) => (
                  <div 
                    key={category} 
                    className="bg-cream-paper p-8 flex flex-col justify-between hover:bg-cream-paper/70 transition-colors duration-300"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex justify-between items-baseline mb-6">
                        <h3 className="font-serif text-lg font-bold text-moss-dark tracking-wide">
                          {category}
                        </h3>
                        <span className="font-mono text-xs text-soil-light/70 tracking-wider">
                          /{orderNo}
                        </span>
                      </div>
                      
                      {/* Partners List */}
                      <div className="space-y-3.5">
                        {items.map((p) => {
                          const isClickable = !!p.url
                          const Component = isClickable ? 'a' : 'div'
                          const props = isClickable ? {
                            href: p.url,
                            target: '_blank',
                            rel: 'noopener noreferrer'
                          } : {}

                          return (
                            <Component
                              key={p.name}
                              {...props}
                              className={`group flex items-center justify-between py-1 border-b border-parchment/15 text-decoration-none ${
                                isClickable 
                                  ? 'cursor-pointer transform hover:translate-x-1.5 transition-all duration-300' 
                                  : ''
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className={`text-sm ${isClickable ? 'font-medium text-moss-dark group-hover:text-moss transition-colors' : 'text-ink-light'}`}>
                                  {p.name}
                                </span>
                                {p.featured && (
                                  <span className="inline-block px-1.5 py-0.5 text-[7px] tracking-wider uppercase bg-terracotta/10 text-terracotta rounded font-mono font-bold">
                                    Mitra Utama
                                  </span>
                                )}
                              </div>
                              {isClickable && (
                                <span className="text-xs text-parchment group-hover:text-moss opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-300 font-mono">
                                  →
                                </span>
                              )}
                            </Component>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-cream-paper border border-parchment rounded-lg">
                <p className="font-serif text-xl text-moss-dark mb-2">Tidak ada hasil ditemukan</p>
                <p className="text-xs text-moss-light mb-6">Kata kunci pencarian "{searchQuery}" tidak mencocokkan kolaborator mana pun.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 text-xs bg-moss text-cream hover:bg-moss-dark transition-colors font-mono tracking-wider uppercase rounded"
                >
                  Bersihkan Pencarian
                </button>
              </div>
            )
          )}

          {/* ── VIEW 2: Flat A-Z Directory List ── */}
          {viewMode === 'direktori' && (
            alphabetizedPartners.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {alphabetizedPartners.map((p) => {
                  const isClickable = !!p.url
                  const Component = isClickable ? 'a' : 'div'
                  const props = isClickable ? {
                    href: p.url,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  } : {}

                  return (
                    <Component
                      key={p.name}
                      {...props}
                      className={`block p-5 bg-cream-paper border border-parchment text-decoration-none group rounded hover:border-moss/45 transition-colors duration-300 ${
                        isClickable ? 'cursor-pointer hover:shadow-card' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono tracking-widest text-soil-light uppercase">
                          {p.category}
                        </span>
                        {p.featured && (
                          <span className="text-[7px] tracking-wider uppercase bg-terracotta/10 text-terracotta px-1 rounded font-mono font-bold">
                            Utama
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`font-serif text-sm font-bold leading-tight ${isClickable ? 'text-moss-dark group-hover:text-moss transition-colors' : 'text-ink-light'}`}>
                          {p.name}
                        </span>
                        {isClickable && (
                          <span className="text-xs text-soil-light/40 group-hover:text-moss group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all font-mono">
                            ↗
                          </span>
                        )}
                      </div>
                    </Component>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-cream-paper border border-parchment rounded-lg">
                <p className="font-serif text-xl text-moss-dark mb-2">Tidak ada hasil ditemukan</p>
                <p className="text-xs text-moss-light mb-6">Kata kunci pencarian "{searchQuery}" tidak mencocokkan kolaborator mana pun.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 text-xs bg-moss text-cream hover:bg-moss-dark transition-colors font-mono tracking-wider uppercase rounded"
                >
                  Bersihkan Pencarian
                </button>
              </div>
            )
          )}

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-cream-dark/50 border-t border-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-[10px] tracking-[0.2em] text-soil-light font-mono uppercase">
              Bergabung
            </p>
            <h2 className="mb-4 font-serif text-3xl font-bold text-moss-dark leading-snug">
              Ingin berkolaborasi dengan Majelis Sayur?
            </h2>
            <p className="text-moss-light text-sm leading-relaxed mb-8">
              Kami terbuka lebar untuk berkolaborasi dengan komunitas lokal, lembaga riset, akademisi, instansi sekolah, seniman, pangan alternatif, hingga pegiat kedaulatan kota. Mari bersinergi menghijaukan dan menghidupkan ruang hidup kita.
            </p>
            <a
              href="mailto:ngukngakofc@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-moss hover:bg-moss-dark text-cream hover:text-cream transition-colors font-mono rounded"
            >
              Hubungi Tim Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

