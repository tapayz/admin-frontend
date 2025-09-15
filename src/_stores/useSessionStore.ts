import { GetMyInfoResponseDto } from "@/_commomActions/myInfo/_dtos/getMyInfoResponse.dto";
import { create } from "zustand";

interface SessionStore {
  session: GetMyInfoResponseDto | null;
  setSession: (session: GetMyInfoResponseDto | null) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session: GetMyInfoResponseDto | null) => {
    set({ session: session });
  },
}));
