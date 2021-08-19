import React from "react";

type NumberRangeType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IColumnProps {
  xxs?: NumberRangeType;
  xs?: NumberRangeType;
  smlr?: NumberRangeType;
  sm?: NumberRangeType;
  md?: NumberRangeType;
  lg?: NumberRangeType;
  xl?: NumberRangeType;
  xxl?: NumberRangeType;
  huge?: NumberRangeType;
  huger?: NumberRangeType;
  [x: string]: any;
}
export const GridColumn: React.FC<IColumnProps> = ({
  xxs = undefined,
  xs = undefined,
  smlr = undefined,
  sm = undefined,
  md = undefined,
  lg = undefined,
  xl = undefined,
  xxl = undefined,
  huge = undefined,
  huger = undefined,
  ...props
}) => {
  let gridClass = "if";
  if (xxs) gridClass += ` col-${xxs}--xxs`;
  if (xs) gridClass += ` col-${xs}--xs`;
  if (smlr) gridClass += ` col-${smlr}--smlr`;
  if (sm) gridClass += ` col-${sm}--sm`;
  if (md) gridClass += ` col-${md}--md`;
  if (lg) gridClass += ` col-${lg}--lg`;
  if (xl) gridClass += ` col-${xl}--xl`;
  if (xxl) gridClass += ` col-${xxl}--xxl`;
  if (huge) gridClass += ` col-${huge}--huge`;
  if (huger) gridClass += ` col-${huger}--huger`;
  return (
    <div className={gridClass} {...props}>
      {props.children}
    </div>
  );
};

export default GridColumn;
