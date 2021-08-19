import React from "react";

export interface IImage {
  imgSrc?: string;
  alt?: string;
  title?: string;
  classNames?: string;
  [x: string]: any;
}
export const Image = React.forwardRef<HTMLImageElement, IImage>(
  (
    { imgSrc = undefined, alt = "", title = "", classNames = "", ...props },
    ref
  ) => {
    return (
      <img
        src={imgSrc}
        title={title}
        ref={ref}
        alt={alt || ""}
        className={`if image ${classNames}`}
        {...props.dataattrs}
        {...props}
      />
    );
  }
);

export default Image;
