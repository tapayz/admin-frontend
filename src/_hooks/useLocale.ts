import { useLocaleStore } from "@/_stores/useLocaleStore";
import { useTranslation } from "react-i18next";

export const useLocale = () => {
  const localeData =
    typeof window !== "undefined" ? localStorage.getItem("lang") : "en";

  const { i18n, t } = useTranslation();
  const { locale, setLocale } = useLocaleStore();

  const handleChangeLocale = (locale: string) => {
    i18n.changeLanguage(locale);
    localStorage.setItem("lang", locale);
    setLocale(locale);
  };

  return { handleChangeLocale, t, locale };
};
