import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JP" },
];

/**
 * Mobile-only language switcher — fixed bottom right
 * Desktop uses TopBar's built-in switcher
 */
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const active =
    languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="md:hidden fixed bottom-32 right-4 z-50">
      {open && (
        <div
          className="absolute bottom-full right-0 mb-2 py-1 min-w-[72px]"
          style={{ background: "#F5F0E8", border: "1px solid #D4C9B0" }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                active.code === lang.code
                  ? "text-moss"
                  : "text-ink-light/60 hover:text-ink-light"
              }`}
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.1em",
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 text-xs transition-opacity hover:opacity-70"
        style={{
          background: "#F5F0E8",
          border: "1px solid #D4C9B0",
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "0.1em",
          color: "#5A6B45",
        }}
        aria-label="Pilih bahasa"
      >
        {active.label}
      </button>
    </div>
  );
}
