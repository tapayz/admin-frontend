import { create } from 'zustand';

interface ColumnVisibility {
  [key: string]: boolean;
}

interface TableColumnStore {
  columnVisibility: ColumnVisibility;
  isVisible: boolean;
  toggleColumn: (columnId: string) => void;
  setColumnVisibility: (visibility: ColumnVisibility) => void;
  clearColumnVisibility: () => void;
}

const initialColumnVisibility: ColumnVisibility = {
  hierarchyInfo: true,
  agencyInfo: true,
  pots_exchange_rate_percent: true,
  currency: true,
  pots: true,
  totalUserBalance: true,
  totalPots: true,
  parentPots: true,
  bottomPots: true,
  status: true,
  loginLog: true,
};

export const useTableColumnStore = create<TableColumnStore>((set) => ({
  columnVisibility: initialColumnVisibility,
  isVisible: true,
  toggleColumn: (columnId) =>
    set((state) => {
      const newVisibility = {
        ...state.columnVisibility,
        [columnId]: !state.columnVisibility[columnId],
      };

      // 모든 컬럼이 true인지 확인
      const allVisible = Object.values(newVisibility).every((value) => value === true);

      return {
        columnVisibility: newVisibility,
        isVisible: allVisible,
      };
    }),
  setColumnVisibility: (visibility) => set({ columnVisibility: visibility }),
  clearColumnVisibility: () => set({ columnVisibility: initialColumnVisibility, isVisible: true }),
}));
