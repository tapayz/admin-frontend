import { create } from 'zustand';

enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeStore {
  theme: ThemeMode;
  isSideBar: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setIsSideBar: (isSideBar: boolean) => void;
  toggleIsSideBar: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: ThemeMode.LIGHT,
  isSideBar: true,
  setTheme: (theme: ThemeMode) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT })),
  setIsSideBar: (isSideBar: boolean) => set({ isSideBar }),
  toggleIsSideBar: () => set((state) => ({ isSideBar: !state.isSideBar })),
}));
