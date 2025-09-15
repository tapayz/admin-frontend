import { create } from "zustand";

interface TableColumnState {
  // TODO: Define table column state
  id: string;
}

interface TableColumnActions {
  // TODO: Define table column actions
  setId: (id: string) => void;
}

export const useTableColumnStore = create<
  TableColumnState & TableColumnActions
>((set) => ({
  // TODO: Implement store
  id: "",
  setId: (id: string) => set({ id }),
}));
