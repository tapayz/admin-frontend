import { Interpolation, Theme } from '@emotion/react';

export interface ChartProps<T> {
  data: T[];
  xDataKey: string;
  xColor?: string;
  yColor?: string;
  yFormatter: (value: number) => string;
  tooltipFormatter: (value: number) => string;
  cssStyle?: Interpolation<Theme>;
  title?: string;
  id: string;
}
