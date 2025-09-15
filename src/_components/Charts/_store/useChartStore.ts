import { create } from 'zustand';

interface ChartData {
  [key: string]: string;
}

interface ChartStore {
  chartData: ChartData;
  setChartData: (data: ChartData) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  chartData: {},
  setChartData: (data) => set((state) => ({ chartData: { ...state.chartData, ...data } })),
}));
