import { create } from "zustand";

interface MemberDetailStore {
  id: string | null;
  setId: (id: string | null) => void;
}

export const useMemberDetailStore = create<MemberDetailStore>((set) => ({
  id: "",
  setId: (id) => set({ id }),
}));
