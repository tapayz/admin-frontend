import { create } from 'zustand';

interface PrefixValues {
  prefix1: string;
  prefix2: string;
  prefix3: string;
  prefix4: string;
}

interface PrefixStore {
  prefixValues: PrefixValues;
  prefixResult: string;
  isPrefixCheck: boolean;
  beforePrefix: string;
  isUsernameCheck: boolean;
  beforeUsername: string;
  setPrefixValue: (field: keyof PrefixValues, value: string) => void;
  setIsPrefixCheck: (value: boolean) => void;
  setBeforePrefix: (value: string) => void;
  resetPrefixValues: () => void;
  setPrefixCheckResult: (value: PrefixValues) => void;
  setIsUsernameCheck: (value: boolean) => void;
  setBeforeUsername: (value: string) => void;
}

export const usePrefixStore = create<PrefixStore>((set) => ({
  prefixValues: {
    prefix1: '',
    prefix2: '',
    prefix3: '',
    prefix4: '',
  },
  prefixResult: '',
  isPrefixCheck: false,
  beforePrefix: '',
  isUsernameCheck: false,
  beforeUsername: '',
  setIsUsernameCheck: (value) => set({ isUsernameCheck: value }),
  setBeforeUsername: (value) => set({ beforeUsername: value }),
  setPrefixValue: (field, value) =>
    set((state) => ({
      prefixValues: {
        ...state.prefixValues,
        [field]: value,
      },
    })),
  setIsPrefixCheck: (value) => set({ isPrefixCheck: value }),
  setBeforePrefix: (value) => set({ beforePrefix: value }),
  resetPrefixValues: () =>
    set({
      prefixValues: {
        prefix1: '',
        prefix2: '',
        prefix3: '',
        prefix4: '',
      },
      isPrefixCheck: false,
      beforePrefix: '',
    }),
  setPrefixCheckResult: (value) =>
    set(() => {
      const prefixData = [value.prefix1, value.prefix2, value.prefix3, value.prefix4];
      const newPrefix = prefixData.join('');
      return {
        prefixResult: newPrefix,
      };
    }),
}));
