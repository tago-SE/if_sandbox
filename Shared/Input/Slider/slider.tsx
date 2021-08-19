import React from "react";

export const defaultMinValue = 0;
export const defaultMaxValue = 100;
export const defaultStep = 1;

export interface ISliderProps extends React.HTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: number) => void;
  style?: React.CSSProperties;
  [x: string]: any;
}

interface ICustomStyle extends React.CSSProperties {
  "--min": number;
  "--max": number;
  "--val": number;
}

/**
 * stateless slider component
 * @param value
 * @param onChange
 */
export function Slider({
  id,
  min = defaultMinValue,
  max = defaultMaxValue,
  value,
  step = defaultStep,
  style,
  onChange,
  onValueChange,
  ...props
}: ISliderProps) {
  const customStyle: ICustomStyle = {
    ...style,
    "--min": min,
    "--max": max,
    "--val": value
  };
  return (
    <input
      type="range"
      role="slider"
      id={id}
      className={`if slider${value > min ? " has-progress" : ""}`}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      max={max}
      min={min}
      step={step}
      value={value}
      data-speccer-measure="height right"
      onChange={(event) => {
        if (onChange) onChange(event);
        if (onValueChange) onValueChange(Number(event.target.value));
      }}
      {...props}
      style={customStyle}
    />
  );
}
