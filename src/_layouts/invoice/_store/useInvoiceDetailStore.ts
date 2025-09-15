import { create } from "zustand";

interface InvoiceDetailStore {
  id: string | null;
  setId: (id: string | null) => void;
}

export const useInvoiceDetailStore = create<InvoiceDetailStore>((set) => ({
  id: "",
  setId: (id) => set({ id }),
}));
