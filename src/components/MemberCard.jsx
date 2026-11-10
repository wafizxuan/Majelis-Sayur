import { UserCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

/**
 * MemberCard — Kartu profil anggota komunitas
 * Props:
 *   name     : string
 *   role     : string
 *   location : string
 *   bio      : string
 *   avatar   : string (URL gambar, opsional)
 *   email    : string (opsional)
 *   crops    : string[] (tanaman yang dibudidayakan)
 */
export default function MemberCard({ name, role, location, bio, avatar, email, crops = [] }) {
  return (
    <div className="card overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
      {/* Header dengan warna gradient */}
      <div className="h-20 bg-gradient-to-br from-sky-mid to-sky-light relative">
        {/* Avatar */}
        <div className="absolute -bottom-8 left-5">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-soft"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border-4 border-white bg-card-bg flex items-center justify-center shadow-soft">
              <UserCircleIcon className="w-10 h-10 text-medium-gray" />
            </div>
          )}
        </div>
      </div>

      {/* Konten */}
      <div className="pt-10 px-5 pb-5">
        <div className="mb-3">
          <h3 className="font-bold text-dark-green text-base">{name}</h3>
          <p className="text-primary-green text-xs font-semibold uppercase tracking-wide">{role}</p>
          {location && (
            <p className="text-medium-gray text-xs mt-0.5">{location}</p>
          )}
        </div>

        {bio && (
          <p className="text-sm text-dark-green/65 leading-relaxed mb-4 line-clamp-3">
            {bio}
          </p>
        )}

        {/* Tag tanaman */}
        {crops.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {crops.map((crop) => (
              <span
                key={crop}
                className="bg-primary-green/10 text-primary-green text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {crop}
              </span>
            ))}
          </div>
        )}

        {/* Email */}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-xs text-medium-gray hover:text-primary-green transition-colors"
          >
            <EnvelopeIcon className="w-3.5 h-3.5" />
            {email}
          </a>
        )}
      </div>
    </div>
  )
}
