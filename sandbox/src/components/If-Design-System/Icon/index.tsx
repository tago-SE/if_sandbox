import React from "react";
import styles from "./icon.module.scss";
export type IconColorOption = "blue" | "white" | "brown" | "disabled" | "black";
export type IconSizeOption = "largest" | "large" | "medium" | "small" | "smallest";

export interface IIconProps {
  className?: string;
  color?: IconColorOption;
  size?: IconSizeOption;
  style?: React.CSSProperties;
  [x: string]: any;
}

const DefaultSizes = {
  largest: "32px",
  large: "28px",
  medium: "24px",
  small: "20px",
  smallest: "16px"
};

const defaultClass = "ui warning-light";
const defaultSize = "largest";

/**
 * Icon component from the if-design-system. Use the className to define which icon is being used.
 * You can customize the dimensions outside the default sizes by overriding the style props: height, width.
 *
 * @param className The category and name reference defined by the if-design-system, e.g "products car"
 * @param color
 * @param size
 * @param style
 * @param props
 */
export const Icon: React.FC<IIconProps> = ({
  className,
  color,
  size = defaultSize,
  style = {},
  ...props
}) => {
  const { width, height, backgroundSize, ...otherStyles } = style;
  return (
    <div
      className={`if icon ${className || defaultClass}${color ? " " + color : ""} ${styles.icon}`}
      style={
        {
          "--w": width || DefaultSizes[size],
          "--h": height || DefaultSizes[size],
          ...otherStyles
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default Icon;
