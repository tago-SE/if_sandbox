import React from 'react';

const colors = {
  white: "#faf9f7",
  blue: "#0054f0",
  brown: "#331e11",
  default: "#331e11"
}

const IFLoader = ({ isLoading, className="", color = "brown", ...props }) => {
  if (!isLoading) return null;

  const colorToUse = colors[color] ? colors[color] : colors.default;

  return (
    <svg
      className={`if loader dots horizontal ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...props}>
      <g className="if svg g">
        <circle className="if svg circle" fill={colorToUse} cx="8" cy="32" r="8" />
        <circle className="if svg circle" fill={colorToUse} cx="32" cy="32" r="8" />
        <circle className="if svg circle" fill={colorToUse} cx="56" cy="32" r="8" />
      </g>
    </svg>
  );
};

export const IFLoaderSmall = (props) => <IFLoader className="small" {...props} />;
export const IFLoaderLarge = (props) => <IFLoader className="large" {...props} />;
export const IFLoaderLargest = (props) => <IFLoader className="largest" {...props} />;

export default IFLoader;
