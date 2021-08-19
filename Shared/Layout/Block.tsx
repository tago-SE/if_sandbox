import React from "react";

export type BlockVariants = "blog" | "dark" | "darker" | "light" | "poc" | "";
/*
    Reference: 
    - https://dev.azure.com/if-it/If%20Design%20Hub/_git/if-design-system?path=%2Fpackages%2Fcore%2Fsrc%2Fblock.scss
*/

export interface BlockProps {
  children?: any;
  variant?: BlockVariants;
  [x: string]: any;
}

/**
 * Primary building block, typically used with a Container child component. Use the variant property to specify the background color.
 */
export const Block: React.FC<BlockProps> = ({ children = null, variant = "", ...props }) => {
  return (
    <div className={`if block ${variant}`} {...props}>
      {children}
    </div>
  );
};

export default Block;
