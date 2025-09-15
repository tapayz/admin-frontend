import { create } from 'zustand';

interface HierarchyFoldingStore {
  expandedItems: Record<number, boolean>;
  setItemExpanded: (itemId: number, expanded: boolean) => void;
  toggleItemExpanded: (itemId: number) => void;
  isItemExpanded: (itemId: number) => boolean;

  // 전체 확장/축소
  expandAll: (itemIds: number[]) => void;
  collapseAll: (itemIds: number[]) => void;

  // 최상위 루트만 토글
  toggleRootOnly: (rootId: number) => void;

  // 초기화
  reset: () => void;
}

export const useHierarchyFoldingStore = create<HierarchyFoldingStore>((set, get) => ({
  expandedItems: {},

  setItemExpanded: (itemId, expanded) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [itemId]: expanded,
      },
    })),

  toggleItemExpanded: (itemId) =>
    set((state) => {
      const currentState = state.expandedItems[itemId] ?? true; // 기본값 true
      return {
        expandedItems: {
          ...state.expandedItems,
          [itemId]: !currentState,
        },
      };
    }),

  isItemExpanded: (itemId) => {
    const state = get();
    return state.expandedItems[itemId] ?? true;
  },

  expandAll: (itemIds) =>
    set((state) => {
      const expandedItems = { ...state.expandedItems };
      itemIds.forEach((id) => {
        expandedItems[id] = true;
      });
      return { expandedItems };
    }),

  collapseAll: (itemIds) =>
    set((state) => {
      const expandedItems = { ...state.expandedItems };
      itemIds.forEach((id) => {
        expandedItems[id] = false;
      });
      return { expandedItems };
    }),

  toggleRootOnly: (rootId) =>
    set((state) => {
      const currentState = state.expandedItems[rootId] ?? true;
      return {
        expandedItems: {
          ...state.expandedItems,
          [rootId]: !currentState,
        },
      };
    }),

  reset: () => set({ expandedItems: {} }),
}));
