import React from "react";
import * as styles from "./highchartContainers.module.scss";

export function ChartContainer({ children }) {
  return <div className={styles.chartContainer}>{children}</div>;
}
