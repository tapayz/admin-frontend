import { create } from "zustand";

interface CheckDuplicateStore {
  checkedId: string | null;
  isChecked: boolean;
  isDuplicateAvailable: boolean;
  isLoading: boolean;
  setCheckedId: (id: string | null) => void;
  setIsChecked: (checked: boolean) => void;
  setIsDuplicateAvailable: (available: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  resetCheck: () => void;
  checkIfIdChanged: (currentId: string) => boolean;
}

export const useCheckDuplicateStore = create<CheckDuplicateStore>((set, get) => ({
  checkedId: null,
  isChecked: false,
  isDuplicateAvailable: false,
  isLoading: false,
  
  setCheckedId: (id) => set({ checkedId: id }),
  setIsChecked: (checked) => set({ isChecked: checked }),
  setIsDuplicateAvailable: (available) => set({ isDuplicateAvailable: available }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  resetCheck: () => set({ 
    checkedId: null, 
    isChecked: false, 
    isDuplicateAvailable: false,
    isLoading: false
  }),
  
  checkIfIdChanged: (currentId) => {
    const { checkedId, isChecked } = get();
    if (isChecked && checkedId !== currentId) {
      set({ isChecked: false, isDuplicateAvailable: false });
      return true;
    }
    return false;
  },
}));