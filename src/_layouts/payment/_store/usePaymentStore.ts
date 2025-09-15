import { create } from "zustand";

interface PaymentStore {
  paymentId: string | null;
  invoiceState: string;
  isIntervalSet: boolean;
  setPaymentId: (id: string | null) => void;
  setInvoiceState: (state: string) => void;
  setIsIntervalSet: (isSet: boolean) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  paymentId: null,
  invoiceState: 'Ready',
  isIntervalSet: false,
  setPaymentId: (paymentId) => set({ paymentId }),
  setInvoiceState: (invoiceState) => set({ invoiceState }),
  setIsIntervalSet: (isIntervalSet) => set({ isIntervalSet }),
}));