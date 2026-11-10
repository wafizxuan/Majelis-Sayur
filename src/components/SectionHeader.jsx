/**
 * SectionHeader — Header section yang konsisten
 * Props:
 *   prefix  : string (teks biasa sebelum aksen)
 *   accent  : string (teks italic kuning/hijau)
 *   suffix  : string (teks biasa setelah aksen, opsional)
 *   sub     : string (teks deskripsi kecil, opsional)
 *   center  : boolean (center alignment, default false)
 *   accentColor : 'yellow' | 'green' (default 'yellow')
 */
export default function SectionHeader({
  prefix,
  accent,
  suffix,
  sub,
  center = false,
  accentColor = 'yellow',
}) {
  const accentClass =
    accentColor === 'green' ? 'italic-accent-green' : 'italic-accent'

  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="text-3xl sm:text-4xl font-black text-dark-green leading-tight">
        {prefix && <span>{prefix} </span>}
        {accent && <span className={accentClass}>{accent}</span>}
        {suffix && <span> {suffix}</span>}
      </h2>
      {sub && (
        <p className="mt-2 text-sm text-medium-gray max-w-md">
          {sub}
        </p>
      )}
    </div>
  )
}
