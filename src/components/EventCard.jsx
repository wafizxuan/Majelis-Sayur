import {
  CalendarDaysIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

/**
 * EventCard — Kartu kegiatan komunitas
 * Props:
 *   icon     : ReactNode (ikon SVG dari Heroicons)
 *   title    : string
 *   date     : string
 *   location : string
 *   desc     : string
 *   tag      : string (opsional, label kategori)
 *   imgSrc   : string (opsional, URL gambar)
 */
export default function EventCard({ icon, title, date, location, desc, tag, imgSrc }) {
  return (
    <div className="card overflow-hidden group cursor-pointer">
      {/* Gambar header kartu */}
      <div className="relative h-40 bg-sky-mid overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-light to-sky-mid">
            <span className="text-primary-green opacity-40">
              {icon}
            </span>
          </div>
        )}
        {tag && (
          <span className="absolute top-3 left-3 bg-primary-green text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>

      {/* Konten */}
      <div className="p-5">
        {/* Ikon + judul */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-primary-green mt-0.5 flex-shrink-0">
            {icon}
          </span>
          <h3 className="font-bold text-dark-green text-base leading-snug group-hover:text-primary-green transition-colors">
            {title}
          </h3>
        </div>

        {/* Meta info */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-2 text-medium-gray text-xs">
            <CalendarDaysIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{date}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-medium-gray text-xs">
              <MapPinIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Deskripsi */}
        <p className="text-sm text-dark-green/70 leading-relaxed line-clamp-2 mb-4">
          {desc}
        </p>

        {/* CTA */}
        <button className="flex items-center gap-1.5 text-primary-green text-sm font-semibold hover:gap-3 transition-all duration-150">
          Lihat Detail
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
