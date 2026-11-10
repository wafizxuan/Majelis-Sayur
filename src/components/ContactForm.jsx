import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import SectionLeaves from './SectionLeaves'

/**
 * ContactForm — Form kontak dengan layout dua kolom
 * Kiri: judul + deskripsi + arrow dekoratif
 * Kanan: form input nama, email, pesan
 */
export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: ganti dengan fetch ke API /api/contact atau integrasi email service
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #D6E8F5 0%, #C8DFF0 100%)' }}>
      <SectionLeaves count={8} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>

        {/* Card utama */}
        <div className="bg-white border border-border-soft rounded-3xl shadow-medium overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── KIRI: judul + deskripsi ── */}
            <div className="p-10 lg:p-14 flex flex-col justify-between relative">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-dark-green leading-[1.25] mb-6">
                  {t('contact.title1')}{' '}
                  <span
                    className="italic"
                    style={{ backgroundColor: '#F5C518', padding: '2px 8px 4px', fontFamily: 'Georgia, serif', lineHeight: 1.4, display: 'inline' }}
                  >
                    {t('contact.title2')}
                  </span>
                  {' '}{t('contact.title3')}
                </h2>
                <p className="text-dark-green/60 text-sm leading-relaxed max-w-sm">
                  {t('contact.desc')}
                </p>
              </div>

              {/* Arrow dekoratif di pojok kanan bawah */}
              <div className="mt-12 lg:mt-0">
                <svg
                  viewBox="0 0 80 80"
                  fill="none"
                  className="w-16 h-16 text-primary-green opacity-60"
                >
                  <path
                    d="M15 65 L60 20 M60 20 L35 18 M60 20 L62 45"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* ── KANAN: form ── */}
            <div
              className="p-10 lg:p-14"
              style={{ background: '#F8FAF8', borderLeft: '1px solid #C8D8E0' }}
            >
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-primary-green">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-dark-green">{t('contact.successTitle')}</h3>
                  <p className="text-sm text-medium-gray">{t('contact.successDesc')}</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                    className="text-primary-green text-sm font-semibold hover:underline mt-2"
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Nama */}
                  <div>
                    <label className="block text-xs font-semibold text-dark-green/70 mb-1.5 uppercase tracking-wide">
                      {t('contact.labelName')} <span className="text-primary-green">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.placeholderName')}
                      className="w-full px-4 py-3 rounded-xl border border-border-soft bg-white text-sm text-dark-green placeholder-medium-gray focus:outline-none focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-dark-green/70 mb-1.5 uppercase tracking-wide">
                      {t('contact.labelEmail')} <span className="text-primary-green">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.placeholderEmail')}
                      className="w-full px-4 py-3 rounded-xl border border-border-soft bg-white text-sm text-dark-green placeholder-medium-gray focus:outline-none focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green transition-all"
                    />
                  </div>

                  {/* Pesan */}
                  <div>
                    <label className="block text-xs font-semibold text-dark-green/70 mb-1.5 uppercase tracking-wide">
                      {t('contact.labelMessage')}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={t('contact.placeholderMessage')}
                      className="w-full px-4 py-3 rounded-xl border border-border-soft bg-white text-sm text-dark-green placeholder-medium-gray focus:outline-none focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green transition-all resize-none"
                    />
                  </div>

                  {/* Tombol kirim — efek 3D gravity */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl disabled:opacity-60"
                    style={{
                      backgroundColor: '#1A2E05',
                      color: '#ffffff',
                      boxShadow: '0 5px 0 #7CB518',
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease, background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7CB518'
                      e.currentTarget.style.boxShadow = '0 5px 0 #4A7C59'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1A2E05'
                      e.currentTarget.style.boxShadow = '0 5px 0 #7CB518'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(4px)'
                      e.currentTarget.style.boxShadow = '0 1px 0 #4A7C59'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 5px 0 #4A7C59'
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70"/>
                        </svg>
                        {t('contact.sending')}
                      </span>
                    ) : (
                      <>
                        {t('contact.send')}
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
