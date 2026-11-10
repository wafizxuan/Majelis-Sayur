/**
 * FeatureCard — Kartu fitur/keunggulan komunitas
 * Props:
 *   icon  : ReactNode
 *   title : string
 *   desc  : string
 */
export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card p-6 flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform duration-200">
      {/* Ikon dalam kotak berwarna */}
      <div className="w-12 h-12 rounded-xl bg-primary-green/10 flex items-center justify-center text-primary-green">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-dark-green text-base mb-1.5">{title}</h3>
        <p className="text-sm text-dark-green/65 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
