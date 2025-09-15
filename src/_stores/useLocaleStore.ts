import { create } from 'zustand';

interface LocaleStore {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: typeof window !== 'undefined' ? localStorage.getItem('lang') ?? 'ko' : 'ko',
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', locale);
    }
    set({ locale });
  },
}));
