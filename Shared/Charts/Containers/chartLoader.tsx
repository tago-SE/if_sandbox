import React from "react";
import * as styles from "./highchartContainers.module.scss";
import { HorizontalLoader, IHorizontalDotsLoaderProps } from "components/Shared/Loaders/HorizontalLoader";

export function ChartLoaderOverlay({ children }) {
  return <div className={styles.chartLoaderOverlay}>{children}</div>;
}

interface IChartLoaderProps extends IHorizontalDotsLoaderProps {
  loading: boolean;
}

/**
 * To adjust the alignment of the loader you can use inline styling on the Overlay Element.
 * Example: <ChartLoader style={{ paddingTop: 10px }} />
 *
 * @param loading
 * @param color
 * @param size
 */
export function ChartLoader({ loading, color = "blue", size = "small", ...props }: IChartLoaderProps) {
  return (
    <ChartLoaderOverlay {...props}>
      <HorizontalLoader size={size} color={color} loading={loading} />
    </ChartLoaderOverlay>
  );
}
