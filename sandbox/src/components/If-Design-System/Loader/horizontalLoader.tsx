import React from "react";
import styles from "./horizontal-loader.module.scss";
// @ts-ignore
import {
  colorLightestBeigeText,
  colorBlueAccent,
  colorBrownText
} from "@if-design-system/color/src/color-variables.module.js";

console.log("COLOR", colorLightestBeigeText);

export type LoaderColorOptions = "white" | "blue" | "brown" | "default";
export type LoaderSizeOptions = "small" | "large" | "largest";

export interface IHorizontalDotsLoaderProps {
  color?: LoaderColorOptions;
  size?: LoaderSizeOptions;
  className?: string;
  loading: boolean;
  style?: React.CSSProperties;
}

const colorMap = {
  white: colorLightestBeigeText,
  blue: colorBlueAccent,
  brown: colorBrownText,
  default: colorBrownText
};

// Rename to HorizontalDotsLoader once merged with old version
export const HorizontalDotsLoader = ({
  loading,
  className,
  color = "default",
  size = "small",
  style
}: IHorizontalDotsLoaderProps) => {
  if (!loading) return null;
  const fill = colorMap[color] ? colorMap[color] : colorMap.default;
  return (
    <svg
      className={`if loader dots horizontal ${size} ${styles.center}${
        className ? " " + className : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      style={style}
    >
      <g className="if svg g">
        <circle className="if svg circle" fill={fill} cx={8} cy={32} r={8} />
        <circle className="if svg circle" fill={fill} cx={32} cy={32} r={8} />
        <circle className="if svg circle" fill={fill} cx={56} cy={32} r={8} />
      </g>
    </svg>
  );
};

export default HorizontalDotsLoader;
