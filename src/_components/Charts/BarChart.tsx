import React, { useMemo } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartProps } from "./_types/chart.type";
import { barChartCSs } from "./BarChart.styles";

interface BarChartProps<T> extends ChartProps<T> {
  barDataKey: string[];
  barColor?: string[];
}

const BarChart = <T,>({
  data,
  xDataKey,
  xColor = "#a7a7a7",
  yColor = "#a7a7a7",
  yFormatter,
  tooltipFormatter,
  barDataKey,
  barColor = ["#b3d9ff"],
  cssStyle,
  title,
  id,
}: BarChartProps<T>) => {
  return (
    <div css={[barChartCSs.wrapper, cssStyle]}>
      <div css={barChartCSs.header}>
        {title && <h3 css={barChartCSs.title}>{title}</h3>}
      </div>
      <div css={barChartCSs.chartWrapper} className="custom-scrollbar-not-hide">
        <ResponsiveContainer css={barChartCSs.chart} width="100%" height={300}>
          <RechartsBarChart
            data={data}
            margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
            barCategoryGap={10}
          >
            <XAxis
              dataKey={xDataKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: xColor, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: yColor, fontSize: 10 }}
              tickFormatter={yFormatter}
            />
            <Tooltip formatter={tooltipFormatter} cursor={false} />
            {barDataKey.map((key, index) => (
              <Bar
                key={`${id}-${key}`}
                dataKey={key}
                fill={barColor[index]}
                radius={[3, 3, 0, 0]}
                maxBarSize={20}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
