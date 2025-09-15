"use client";

import React, { useMemo } from "react";
import { footerCss } from "./Footer.styles";
import Dropdown from "@/_components/Dropdown/Dropdown";
import { ChevronUp } from "lucide-react";
import theme from "@/_theme";
import { useLocale } from "@/_hooks/useLocale";
import { countryData } from "@/_datas/menu/country.data";
import { useThemeStore } from "@/_stores/useThemeStore";

const Footer = () => {
  const { locale, handleChangeLocale, t } = useLocale();
  const { isSideBar } = useThemeStore();
  const localeCode = useMemo(() => {
    return countryData.find((country) => country.code === locale)?.name;
  }, [locale]);
  return (
    <footer css={[footerCss.footer, !isSideBar && footerCss.footerSideBar]}>
      <p css={footerCss.copyright}>
        © 2025 <span>TAPAYZ</span>
      </p>
      <Dropdown
        trigger={
          <button css={footerCss.countryButton}>
            <span>{localeCode}</span>
            <ChevronUp size={14} color={theme.colors.coolGray700} />
          </button>
        }
      >
        <ul>
          {countryData.map((country) => (
            <li key={`footer-${country.id}-${country.code}`}>
              <button
                css={footerCss.countryItem}
                onClick={() => handleChangeLocale(country.code)}
              >
                <span css={footerCss.countryItemIcon}>{country.icon}</span>
                <p>{country.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </footer>
  );
};

export default Footer;
