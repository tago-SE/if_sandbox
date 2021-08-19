import React from "react";
import { customButton as customButtonStyle } from "./custom-button.module.scss";

export interface ICustomButtonStyle extends React.CSSProperties {
  width: string;
  height: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  fontSize?: string;
  padding?: string;
}

export interface ICustomButtonProps {
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "info";
  onKeyPress?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style: ICustomButtonStyle;
  [x: string]: any;
}

/**
 * Customizeable If button component.
 * @param variant base styling
 * @param style required extended style attributes to be applied.
 */
export function CustomButton({
  disabled = false,
  variant = "primary",
  onKeyPress,
  onClick,
  children,
  style,
  ...props
}: ICustomButtonProps) {
  const { width, height, padding, backgroundColor, borderColor, ...remainingStyle } = style;
  const customStyle = {
    ...remainingStyle,
    "--width": width,
    "--height": height,
    "--padding": padding,
    "--backgroundColor": backgroundColor,
    "--borderColor": borderColor
  };
  return (
    <button
      type="button"
      onKeyPress={(event) => {
        if (onKeyPress) onKeyPress(event);
      }}
      onClick={(event) => {
        if (onClick) onClick(event);
      }}
      disabled={disabled}
      {...props}
      className={`if ${variant} button ${customButtonStyle}`}
      style={customStyle}
    >
      {children}
    </button>
  );
}
