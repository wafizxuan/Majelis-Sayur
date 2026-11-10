import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

/**
 * FAQAccordion — Komponen FAQ dengan animasi expand/collapse
 * Props:
 *   items : Array<{ question: string, answer: string }>
 */
export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-white/80 rounded-xl border border-border-soft overflow-hidden shadow-card"
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left group"
            aria-expanded={openIndex === i}
          >
            <span className="font-medium text-dark-green text-sm group-hover:text-primary-green transition-colors">
              {item.question}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 text-medium-gray flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? 'rotate-180 text-primary-green' : ''
              }`}
            />
          </button>

          {/* Konten jawaban */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="px-5 pb-4 text-sm text-dark-green/70 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
