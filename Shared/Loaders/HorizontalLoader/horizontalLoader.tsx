import React from "react";
import { default as styles } from "./horizontal-loader.module.scss";
import { colors } from "styles/constants";
import { HorizontalLoader } from ".";

export type LoaderColorOptions = "white" | "blue" | "brown" | "default";
export type LoaderSizeOptions = "small" | "large" | "largest" | "";

export interface IHorizontalDotsLoaderProps {
  color?: LoaderColorOptions;
  size?: LoaderSizeOptions;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
}

const colorMap = {
  white: colors.ColorTextLightestBeige,
  blue: colors.ColorAccentBlue,
  brown: colors.ColorTextBrown,
  default: colors.ColorTextBrown
};

/**
 * @todo: Rename to HorizontalDotsLoader or HorizontalLoader whenever the old one is replaced
 */
export const SvgLoader = ({
  loading = true,
  className,
  color = "default",
  size = "",
  style
}: IHorizontalDotsLoaderProps) => {
  if (!loading) return null;
  const fill = colorMap[color] ? colorMap[color] : colorMap.default;
  return (
    <svg
      className={`if loader dots horizontal ${size} ${styles.center}${className ? " " + className : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      style={style}
    >
      <g className="if svg g">
        <circle className={`if svg circle`} fill={fill} cx={8} cy={32} r={8} />
        <circle className="if svg circle" fill={fill} cx={32} cy={32} r={8} />
        <circle className="if svg circle" fill={fill} cx={56} cy={32} r={8} />
      </g>
    </svg>
  );
};

export interface HorizontalLoaderWrapperProps extends IHorizontalDotsLoaderProps {
  horizontalAlignment?: "left" | "right" | "center";
  verticalAlignment?: "top" | "bottom" | "center";
  wrapperHeight?: string;
  wrapperWidth?: string;
}

export const HorizontaLoaderWrapper = ({
  horizontalAlignment = "center",
  verticalAlignment = "center",
  wrapperHeight = "50vh",
  wrapperWidth = "100%",
  ...loaderProps
}: HorizontalLoaderWrapperProps) => {
  if (!loaderProps.loading) return null;

  const alignmentMap = {
    left: "flex-start",
    right: "flex-end",
    top: "flex-start",
    bottom: "flex-end",
    center: "center"
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: alignmentMap[horizontalAlignment],
        alignItems: alignmentMap[verticalAlignment],
        height: wrapperHeight,
        width: wrapperWidth
      }}
    >
      <HorizontalLoader {...loaderProps} />
    </div>
  );
};

export default SvgLoader;
