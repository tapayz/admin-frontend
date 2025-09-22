'use client';

import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function LocaleProvider({ children }: Props) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    // 기존 로직 (언어 감지 및 초기화)
    const langList = ['en', 'ko', 'jp'];
    let lang;
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
      if (!lang) {
        localStorage.removeItem('lang');
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      lang = (navigator.language || navigator.userLanguage).split('-')[0];
    }
    const userLang = langList.find((l) => l?.toLowerCase() === lang?.toLowerCase())?.toLowerCase() || 'en';
    localStorage.setItem('lang', userLang);

    i18n
      .use(HttpApi)
      .use(initReactI18next)
      .init({
        lng: userLang,
        fallbackLng: userLang,
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: `/lang/{{lng}}.json`,
        },
      })
      .then(() => setInit(true));
  }, [init]);

  if (!init) {
    return null;
  }

  return <>{children}</>;
}

export default LocaleProvider;
