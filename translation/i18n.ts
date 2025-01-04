import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/translation.en.json"; // 영어
import ko from "./translations/translation.ko.json"; // 한국어
const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "ko", // 디폴트 언어
  resources,
  fallbackLng: "en", // 대체 언어
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
