# MajelisSayur — Frontend Documentation

> "not planting is the same as dying"

Website komunitas petani urban dibangun dengan **Vite + React.js + Tailwind CSS**.

---

## Tech Stack

| Layer      | Teknologi                          |
|------------|------------------------------------|
| Bundler    | Vite 6                             |
| UI         | React 18                           |
| Styling    | Tailwind CSS 3                     |
| Routing    | React Router DOM 7                 |
| Icons      | Heroicons v2 (`@heroicons/react`)  |
| Fonts      | Inter (Google Fonts)               |

---

## Struktur Proyek

```
majelis-sayur/
├── public/
├── src/
│   ├── components/          # Komponen reusable
│   │   ├── Navbar.jsx       # Navigasi fixed + mobile menu
│   │   ├── Footer.jsx       # Footer dengan kontak & sosmed
│   │   ├── EventCard.jsx    # Kartu kegiatan komunitas
│   │   ├── FeatureCard.jsx  # Kartu fitur/keunggulan
│   │   ├── MemberCard.jsx   # Kartu profil anggota
│   │   ├── FAQAccordion.jsx # Accordion FAQ animasi
│   │   └── SectionHeader.jsx# Header section konsisten
│   │
│   ├── data/                # Data dummy (ganti dengan API call)
│   │   ├── events.js        # Daftar kegiatan
│   │   ├── members.js       # Daftar anggota
│   │   └── faq.js           # Pertanyaan FAQ
│   │
│   ├── pages/               # Halaman utama
│   │   ├── HomePage.jsx     # Beranda (Hero, Aim, Events, Features, FAQ)
│   │   ├── AboutPage.jsx    # Tentang Kami (Who, What, Team, Contact)
│   │   └── FarmerPage.jsx   # Halaman Anggota + filter + modal detail
│   │
│   ├── App.jsx              # Router utama
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind directives + custom utilities
│
├── tailwind.config.js       # Konfigurasi warna kustom
├── index.html               # HTML template
└── README.md                # Dokumentasi ini
```

---

## Instalasi & Menjalankan

```bash
# 1. Masuk ke folder proyek
cd majelis-sayur

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Build untuk production
npm run build

# 5. Preview build production
npm run preview
```

---

## Palet Warna Kustom (`tailwind.config.js`)

Semua warna didefinisikan dengan nama semantik agar mudah digunakan di seluruh kode:

```js
colors: {
  "primary-green":  "#7CB518",  // Hijau cerah — tombol CTA, aksen aktif
  "dark-green":     "#1A2E05",  // Hijau tua — teks utama, heading
  "accent-yellow":  "#F5C518",  // Kuning — italic highlight, aksen dekoratif
  "sky-light":      "#D6E8F5",  // Biru langit muda — background utama
  "sky-mid":        "#B8D4E8",  // Biru langit medium — section alternating
  "light-gray":     "#F4F6F8",  // Abu-abu muda — background kartu
  "medium-gray":    "#8FA3A8",  // Abu-abu medium — teks sekunder
  "card-bg":        "#E8EDF0",  // Background kontainer
  "border-soft":    "#C8D8E0",  // Border lembut
}
```

**Cara pakai di komponen:**
```jsx
<div className="bg-sky-light text-dark-green border border-border-soft">
  <button className="bg-primary-green hover:bg-dark-green text-white">
    Bergabung
  </button>
</div>
```

---

## Halaman & Komponen

### 1. HomePage (`/`)
| Section         | Deskripsi                                              |
|-----------------|--------------------------------------------------------|
| `HeroSection`   | Judul besar, tagline, CTA, stats, visual placeholder   |
| `AimSection`    | "know your aim" — misi komunitas + kotak hijau         |
| `EventsSection` | Carousel kegiatan mendatang dengan navigasi prev/next  |
| `FeaturesSection`| Grid 6 fitur keunggulan komunitas                     |
| `FAQSection`    | Accordion FAQ + CTA bergabung                          |

### 2. AboutPage (`/about`)
| Section           | Deskripsi                                            |
|-------------------|------------------------------------------------------|
| `WhoWeAreSection` | Hero "Who We Are?" dengan stats                      |
| `WhatWeDoSection` | "What we do?" dengan poin kegiatan                   |
| `TeamSection`     | Grid tim inti (3 col) + anggota aktif (4 col)        |
| `ContactSection`  | Info kontak + placeholder peta Google Maps           |

### 3. FarmerPage (`/farmer`)
| Section           | Deskripsi                                            |
|-------------------|------------------------------------------------------|
| `FarmerHero`      | Hero section dengan badge verifikasi                 |
| Filter & Search   | Search bar + filter pills (Semua/Tim Inti/Aktif)     |
| Grid Anggota      | Kartu anggota yang bisa diklik untuk detail          |
| `MemberDetailCard`| Modal popup profil lengkap anggota                   |
| CTA Bergabung     | Banner dark dengan tombol daftar                     |

---

## Mengganti Data Dummy dengan API

Semua data dummy ada di folder `src/data/`. Ganti dengan `fetch` atau library seperti `axios`/`react-query`:

```js
// Contoh: src/data/events.js → ganti dengan hook
import { useEffect, useState } from 'react'

export function useEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ganti URL dengan endpoint API backend Anda
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
  }, [])

  return { events, loading }
}
```

**File yang perlu diupdate:**
- `src/data/events.js` → `GET /api/events`
- `src/data/members.js` → `GET /api/members`
- `src/data/faq.js` → `GET /api/faq`
- Konten teks di `AboutPage.jsx` → `GET /api/content/about`

---

## Ikon

Semua ikon menggunakan **Heroicons v2** (SVG murni, bukan emoji):

```jsx
import { UserGroupIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

// Penggunaan
<UserGroupIcon className="w-5 h-5 text-primary-green" />
```

Tersedia dua varian: `24/outline` (garis) dan `24/solid` (padat).
Lihat semua ikon di: [heroicons.com](https://heroicons.com)

---

## Menambahkan Halaman Baru

1. Buat file di `src/pages/NamaHalaman.jsx`
2. Tambahkan route di `src/App.jsx`:
   ```jsx
   <Route path="/nama-halaman" element={<NamaHalaman />} />
   ```
3. Tambahkan link di `src/components/Navbar.jsx` array `navItems`

---

## Catatan Aksesibilitas

- Semua tombol memiliki `aria-label` yang deskriptif
- Gambar placeholder harus diberi `alt` text yang bermakna saat diganti
- Kontras warna memenuhi WCAG AA (dark-green `#1A2E05` di atas sky-light `#D6E8F5`)
- Navigasi keyboard didukung penuh

---

## Roadmap (Halaman Berikutnya)

- [ ] **FarmerPage** — Form pendaftaran anggota baru
- [ ] **EventDetailPage** — Halaman detail kegiatan + form RSVP
- [ ] **GalleryPage** — Galeri foto kegiatan komunitas
- [ ] **BlogPage** — Artikel & tips bertani urban
- [ ] **AuthPage** — Login/register anggota

---

*Dibuat dengan semangat bertani urban. MajelisSayur © 2025*
