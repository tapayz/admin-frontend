import { timeData } from "@/_datas/menu/time.data";
import dayjs from "dayjs";
import { create } from "zustand";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface UtcTimeStore {
  convertedTime: string;
  currentUtcTime: string;
  setCurrentUtcTime: (utcTime: string) => void;
  convertUtcTime: (utcTime: Date | undefined) => void;
}

export const useUtcTimeStore = create<UtcTimeStore>((set, get) => ({
  convertedTime: dayjs(new Date()).format("YYYY-MM-DD (HH:mm:ss)"),
  currentUtcTime:
    typeof window !== "undefined"
      ? localStorage.getItem("utc") || "Asia/Seoul"
      : "Asia/Seoul",
  setCurrentUtcTime: (utcTime: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("utc", utcTime);
    }
    set({ currentUtcTime: utcTime });
    // 시간대 변경 시 시간도 업데이트
    const findUtc = timeData.find((time) => time.value === utcTime);
    const convertedTime = dayjs(new Date()).tz(utcTime);
    const time = convertedTime.format(
      `YYYY-MM-DD (HH:mm:ss ${findUtc?.label})`
    );
    set({ convertedTime: time });
  },
  convertUtcTime: (utcTime: Date | undefined) => {
    if (!utcTime) return;
    const currentUtc = get().currentUtcTime;
    const findUtc = timeData.find((time) => time.value === currentUtc);
    const convertedTime = dayjs(utcTime).tz(currentUtc);
    const time = convertedTime.format(
      `YYYY-MM-DD (HH:mm:ss ${findUtc?.label})`
    );
    set({ convertedTime: time });
  },
}));
