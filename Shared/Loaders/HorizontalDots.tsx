import React from "react";
interface OwnProps {
  size;
  alignment;
  color?;
}
/**
 * @deprecated Replaced by horizontalLoader
 */
export const HorizontalDots = ({ size, alignment, color }: OwnProps) => (
  <span className={`if loader ${alignment}`}>
    {/* 
      Lighthouse did not like this syntax
    <style>{`
      .if.loader.horizontal {
        height: 2rem;
      }
      .if.loader.right {
        margin-right: 0;
        width: 30px;
      }
    `}</style> */}
    <svg className={`if loader dots horizontal ${size}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <g className="if svg g">
        <circle className="if svg circle" fill={`${color ? color : "#331e11"}`} cx="8" cy="32" r="6"></circle>
        <circle className="if svg circle" fill={`${color ? color : "#331e11"}`} cx="32" cy="32" r="6"></circle>
        <circle className="if svg circle" fill={`${color ? color : "#331e11"}`} cx="56" cy="32" r="6"></circle>
      </g>
    </svg>
  </span>
);
