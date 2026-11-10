import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import id from './id'
import en from './en'
import ja from './ja'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: 'id',           // default bahasa Indonesia
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false, // React sudah handle XSS
    },
  })

export default i18n
