import { create } from 'zustand';

interface ModalStore {
  isModalOpen: boolean;
  isExitModalOpen: boolean;
  isConfirmModalOpen: boolean;
  editAgencyId: number | null;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsExitModalOpen: (isExitModalOpen: boolean) => void;
  setIsConfirmModalOpen: (isConfirmModalOpen: boolean) => void;
  setEditAgencyId: (editAgencyId: number | null) => void;
}

export const useCreateModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  isExitModalOpen: false,
  isConfirmModalOpen: false,
  editAgencyId: null,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  setIsExitModalOpen: (isExitModalOpen: boolean) => set({ isExitModalOpen }),
  setIsConfirmModalOpen: (isConfirmModalOpen: boolean) => set({ isConfirmModalOpen }),
  setEditAgencyId: (editAgencyId: number | null) => set({ editAgencyId }),
}));
