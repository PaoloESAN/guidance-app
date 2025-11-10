import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esJSON from './locales/es.json';
import enJSON from './locales/en.json';

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'es' : 'es',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: { translation: esJSON },
            en: { translation: enJSON },
        },
    });

export default i18n;
