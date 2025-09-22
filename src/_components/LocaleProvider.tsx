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

    // 기본 언어를 'en'으로 강제 설정
    const langList = ['en', 'ko', 'jp'];
    let lang = localStorage.getItem('lang');

    // localStorage에 언어가 없으면 기본값을 'en'으로 설정
    if (!lang) {
      lang = 'en';
    }

    const userLang = langList.find((l) => l?.toLowerCase() === lang?.toLowerCase())?.toLowerCase() || 'en';
    localStorage.setItem('lang', userLang);

    i18n
      .use(HttpApi)
      .use(initReactI18next)
      .init({
        lng: userLang,
        fallbackLng: 'en',
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
