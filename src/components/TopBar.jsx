import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "ja", label: "JP" },
];

export default function TopBar() {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRefDesktop = useRef(null);
  const langRefMobile = useRef(null);

  const active =
    languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e) => {
      const desktopContains = langRefDesktop.current?.contains(e.target);
      const mobileContains = langRefMobile.current?.contains(e.target);
      
      if (!desktopContains && !mobileContains) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Auto-close language dropdown when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) setLangOpen(false);
  }, [mobileMenuOpen]);

  // Prevent scroll when drawer is open (iOS-compatible)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.farmer"), to: "/farmer" },
    { label: t("nav.school"), to: "/school" },
    { label: t("nav.catalog"), to: "/catalog" },
    { label: t("nav.events"), to: "/events" },
    { label: t("nav.network"), to: "/network" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0"
      style={{
        background: "#F5F0E8",
        borderBottom: "1px solid #D4C9B0",
        zIndex: 1050,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-12">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-0 group">
            <span
              className="font-serif font-black text-moss-dark text-lg leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Majelis
            </span>
            <span
              className="font-serif font-black italic text-cream text-lg leading-none px-2 py-0.5 ml-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "#4A5E3A",
              }}
            >
              Sayur
            </span>
          </Link>

          {/* Center: Nav (Desktop only) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `text-xs font-sans tracking-wide transition-colors duration-150 ${
                    isActive
                      ? "text-moss font-medium"
                      : "text-ink-light/60 hover:text-ink-light"
                  }`
                }
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="/admin/index.html"
              className="text-xs font-sans tracking-wide transition-colors duration-150 text-ink-light/60 hover:text-ink-light"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              Admin
            </a>
          </nav>

          {/* Right Actions (Desktop only) */}
          <div className="hidden md:flex items-center gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/6281498365377"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-light/50 hover:text-moss transition-colors"
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.06em",
              }}
            >
              WA
            </a>

            {/* Email */}
            <a
              href="mailto:ngukngakofc@gmail.com"
              className="text-xs text-ink-light/50 hover:text-moss transition-colors"
              style={{
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.06em",
              }}
            >
              EMAIL
            </a>

            {/* Divider */}
            <span
              style={{
                width: 1,
                height: 16,
                background: "#D4C9B0",
                display: "inline-block",
              }}
            />

            {/* Language switcher */}
            <div ref={langRefDesktop} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-xs text-ink-light/60 hover:text-moss transition-colors flex items-center gap-1"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.1em",
                }}
                aria-label={`Change language. Current: ${active.label}`}
                aria-expanded={langOpen}
                aria-haspopup="true"
              >
                {active.label}
                <svg
                  viewBox="0 0 10 6"
                  className="w-2 h-2 opacity-50"
                  fill="none"
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="absolute top-full right-0 mt-2 py-1 min-w-[80px]"
                  style={{
                    background: "#F5F0E8",
                    border: "1px solid #D4C9B0",
                    zIndex: 100,
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                        active.code === lang.code
                          ? "text-moss bg-cream-dark"
                          : "text-ink-light/60 hover:text-ink-light hover:bg-cream-dark"
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
            </div>
          </div>

          {/* Right Actions (Mobile only) */}
          <div className="flex md:hidden items-center gap-4">
            {/* Language Dropdown Button */}
            <div ref={langRefMobile} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="text-[10px] text-ink-light/60 hover:text-moss transition-colors font-mono tracking-wider"
                aria-label={`Change language. Current: ${active.label}`}
                aria-expanded={langOpen}
                aria-haspopup="true"
              >
                {active.label}
              </button>
              {langOpen && (
                <div
                  className="absolute top-full right-0 mt-2 py-1 min-w-[70px] shadow-card"
                  style={{
                    background: "#F5F0E8",
                    border: "1px solid #D4C9B0",
                    zIndex: 10000,
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1 text-[10px] font-mono tracking-wider ${
                        active.code === lang.code
                          ? "text-moss bg-cream-dark"
                          : "text-ink-light/60 hover:text-ink-light hover:bg-cream-dark"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Toggle */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) setLangOpen(false);
              }}
              className="text-moss-dark hover:text-moss p-1 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Land O'Lakes Style) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[9998] transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding Drawer Container */}
          <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-cream-paper border-l border-parchment z-[9999] p-6 flex flex-col justify-between shadow-lift">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-parchment/40">
                <Link
                  to="/"
                  className="flex items-center gap-0 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-serif font-black text-moss-dark text-base leading-none">
                    Majelis
                  </span>
                  <span className="font-serif font-black italic text-cream text-base leading-none px-1.5 py-0.5 ml-1 bg-moss">
                    Sayur
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-moss-dark hover:text-moss p-1 focus:outline-none"
                  aria-label="Close navigation menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Drawer Vertical Links (Editorial Large Serif) */}
              <nav className="mt-8 flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-baseline gap-3 text-lg font-serif font-bold transition-all duration-200 ${
                        isActive
                          ? "text-moss"
                          : "text-moss-dark hover:text-moss hover:translate-x-1"
                      }`
                    }
                  >
                    <span className="font-mono text-[10px] text-soil-light/60 tracking-wider">
                      {String(index + 1).padStart(2, "0")}/
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                <a
                  href="/admin/index.html"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-baseline gap-3 text-lg font-serif font-bold text-moss-dark hover:text-moss hover:translate-x-1 transition-all duration-200"
                >
                  <span className="font-mono text-[10px] text-soil-light/60 tracking-wider">
                    {String(navItems.length + 1).padStart(2, "0")}/
                  </span>
                  <span>Admin</span>
                </a>
              </nav>
            </div>

            {/* Drawer Bottom Panel (Socials & Contacts) */}
            <div className="pt-6 border-t border-parchment/40">
              <div className="flex gap-4">
                <a
                  href="https://wa.me/6281498365377"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-soil-light hover:text-moss transition-colors font-mono tracking-widest"
                >
                  WHATSAPP
                </a>
                <a
                  href="mailto:ngukngakofc@gmail.com"
                  className="text-[10px] text-soil-light hover:text-moss transition-colors font-mono tracking-widest"
                >
                  EMAIL
                </a>
              </div>
              <p className="mt-3 text-[8px] font-mono text-soil-light/40 uppercase tracking-widest">
                MAJELIS SAYUR © 2026
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
