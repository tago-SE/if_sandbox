import React from "react";
import { Slider, ISliderProps, defaultMinValue, defaultMaxValue } from "./slider";

export interface ISlideLabelProps extends React.LabelHTMLAttributes<any> {
  text: any;
  htmlFor?: string;
  alignment?: "left" | "center" | "right";
  style?: React.CSSProperties;
  [x: string]: any;
}

export function SlideLabel({ text, htmlFor = undefined, alignment, style, ...props }: ISlideLabelProps) {
  const _style = alignment ? { textAlign: alignment, justifyContent: alignment, ...style } : { ...style };
  return (
    <label className="if slider-data" htmlFor={htmlFor} style={_style} {...props}>
      <span>{text}</span>
    </label>
  );
}

export interface ISlideContainerProps {
  children?: React.ReactFragment;
  [x: string]: any;
}

export function SlideContainer({ children, ...props }: ISlideContainerProps) {
  return (
    <div className="if slider-container" {...props}>
      {children}
    </div>
  );
}

export interface ISideValueProps extends React.HTMLAttributes<HTMLInputElement> {
  enabled?: boolean;
}

export interface ISliderWrapperProps {
  labelProps?: ISlideLabelProps;
  sliderProps?: ISliderProps;
  sideValueProps?: ISideValueProps;
  containerProps?: ISlideContainerProps;
  [x: string]: any;
}

export function SliderWrapper({ labelProps, sliderProps, sideValueProps, containerProps }: ISliderWrapperProps) {
  const showSlideValues = sideValueProps?.hasOwnProperty("enabled") ? sideValueProps.enabled : true;
  const { enabled, ...defaultSliderValueProps } = sideValueProps;
  return (
    <SlideContainer {...containerProps}>
      {labelProps && <SlideLabel {...labelProps} />}
      <Slider {...sliderProps} />
      {showSlideValues ? (
        <div className="if slider-values" {...defaultSliderValueProps}>
          <div className="if min">{sliderProps?.min || defaultMinValue}</div>
          <div className="if max">{sliderProps?.max || defaultMaxValue}</div>
        </div>
      ) : null}
    </SlideContainer>
  );
}
