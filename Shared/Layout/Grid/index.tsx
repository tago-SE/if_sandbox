import React, { ReactNode } from "react";

export interface IGridProps {
  children?: ReactNode;
  variant?: "fluid" | "wide" | "across" | "";
}

export const Grid: React.FC<IGridProps> = ({ children = null, variant = "" }) => {
  return <div className={`if grid ${variant}`}>{children}</div>;
};

export interface IRowProps {
  children?: ReactNode;
  [x: string]: any;
}

export const GridRow: React.FC<IRowProps> = ({ children, className, ...props }) => {
  return (
    <div className={`if row${className ? " " + className : ""}`} {...props}>
      {children}
    </div>
  );
};

export { GridColumn } from "./gridColumn";
