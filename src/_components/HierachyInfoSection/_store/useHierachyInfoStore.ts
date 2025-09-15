import { create } from "zustand";
import { SelectOption } from "@/_components/Select/types/select.types";
import { HierarchyInfo } from "../_dtos/GetHierarchyInfoResponse.dto";

const flattenHierarchy = (
  node: HierarchyInfo | null,
  options: SelectOption[] = []
): SelectOption[] => {
  if (!node) return options;

  options.push({
    label: node.username,
    value: node.username,
  });

  if (node.children && node.children.length > 0) {
    node.children.forEach((child: HierarchyInfo) => {
      flattenHierarchy(child, options);
    });
  }

  return options;
};

interface HierachyInfoStore {
  isHierachyInfoSection: boolean;
  isAllView: boolean;
  setIsHierachyInfoSection: (isAgentSection: boolean) => void;
  setIsAllView: (isAllView: boolean) => void;
  toggleIsHierachyInfoSection: () => void;
  toggleIsAllView: () => void;
  handleChangeHierachyInfoSection: (value: boolean) => void;
  hierachyOptions: SelectOption[];
  setHierachyOptions: (options: SelectOption[]) => void;
  setHierarchyData: (hierarchyData: HierarchyInfo) => void;
  clearHierachyOptions: () => void;
  hierachyRootId: number;
  setHierachyRootId: (rootId: number) => void;
}

export const useHierachyInfoStore = create<HierachyInfoStore>((set) => ({
  isHierachyInfoSection: false,
  isAllView: false,
  handleChangeHierachyInfoSection: (value) =>
    set({ isHierachyInfoSection: value }),
  setIsHierachyInfoSection: (isAgentSection: boolean) =>
    set({ isHierachyInfoSection: isAgentSection }),
  setIsAllView: (isAllView: boolean) => set({ isAllView }),
  toggleIsHierachyInfoSection: () =>
    set((state) => ({ isHierachyInfoSection: !state.isHierachyInfoSection })),
  toggleIsAllView: () => set((state) => ({ isAllView: !state.isAllView })),
  hierachyOptions: [],
  setHierachyOptions: (options: SelectOption[]) =>
    set({ hierachyOptions: options }),

  setHierarchyData: (hierarchyData: HierarchyInfo) => {
    const options = flattenHierarchy(hierarchyData);
    set({ hierachyOptions: options });
  },

  clearHierachyOptions: () => set({ hierachyOptions: [] }),
  hierachyRootId: 0,
  setHierachyRootId: (rootId: number) => set({ hierachyRootId: rootId }),
}));
