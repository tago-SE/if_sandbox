import React from "react";
import { IRangeSelectorOptionsExt, SynchronizeOptions, TimeOptions, TimeSeriesChart } from "./timeSeriesChart";

interface ISeries {
  name: string;
  id: string;
  type: "column" | "area";
  data: [];
}

export interface IStackingTimeSeriesProps {
  series: Array<ISeries>;
  title?: string;
  tooltip?: boolean;
  loading?: boolean;
  legend?: boolean;
  time?: TimeOptions;
  exporting?: boolean;
  stacking?: "number" | "percent";
  rangeSelector?: IRangeSelectorOptionsExt | any;
  xAxis?: {
    floor?: number;
    ceiling?: number;
  };
  containerProps?: { [key: string]: any };
  onCreation?: (chart: any) => void;
  onLegendItemClick?: (legend: any) => void;
  onLegendItemMouseOver?: (legend: any) => void;
  onLegendItemMouseOut?: (legend: any) => void;
  onPointMouseOver?: (point: any) => void;
  onPointMouseOut?: (point: any) => void;
  onSeriesMouseOver?: (series: any) => void;
  onSeriesMouseOut?: (series: any) => void;
  synchronize?: SynchronizeOptions;
}

export const StackTimeSeriesChart = (props: IStackingTimeSeriesProps) => {
  return <TimeSeriesChart {...props} />;
};

export default StackTimeSeriesChart;
