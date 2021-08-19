import React, { CSSProperties } from "react";
import * as styles from "./product.module.scss";

export const ProductGrid: React.FC<{ children: React.ReactNode; style?: CSSProperties }> = ({ children, style }) => (
  <div className={styles.grid} style={style}>
    {children}
  </div>
);
