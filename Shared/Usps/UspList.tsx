import React, { ReactNode } from "react";

export interface IUspListProps {
  children?: ReactNode;
  alignment?: "center" | "left";
  vertical?: boolean;
  [x: string]: any;
}

export const UspList: React.FC<IUspListProps> = ({
  children = null,
  alignment = "center",
  vertical = false,
  ...props
}) => {
  const { style, ...rest } = props;
  let _style: React.CSSProperties = style;
  if (vertical) {
    if (!_style) _style = {};
    _style.rowGap = "0";
  }
  return (
    <ul
      className={`if quick-facts ${vertical ? "vertical" : "horizontal"}${alignment.length > 0 ? " " + alignment : ""}`}
      style={_style}
      {...rest}
    >
      {children}
    </ul>
  );
};
