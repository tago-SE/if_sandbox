import React from 'react';

/*
    Reference: 
    - https://dev.azure.com/if-it/If%20Design%20Hub/_git/if-design-system?path=%2Fpackages%2Fcore%2Fsrc%2Flayout.scss
*/

export interface ContainerProps {
  children?: any, 
  variant?: 'fluid' | 'across' | 'wide' | 'left' | "";
  [x: string]: any
};

/**
 * Content container adds padding to the sides, typically used inside a Block component. 
 */
export const Container : React.FC<ContainerProps> = ({
  children = null,
  variant = "",
  ...props
}) => {
  return (<div className={`if container ${variant}`} {...props}>{children}</div>);
}

export default Container;
