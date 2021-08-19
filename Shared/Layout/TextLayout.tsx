import React from "react";

/*
    Reference: 
    - https://dev.azure.com/if-it/If%20Design%20Hub/_git/if-design-system?path=%2Fpackages%2Fcore%2Fsrc%2Flayout.scss
*/

// TextLayout
export interface ITextLayout {
  children?: any;
  variant?: "columns" | "column" | "";
  [x: string]: any;
}

/**
 * TextLayout typically consists of one or more TextBody components.
 */
export const TextLayout: React.FC<ITextLayout> = ({ children = null, variant = "", ...props }) => {
  return (
    <div className={`if text layout ${variant}`} {...props}>
      {children}
    </div>
  );
};

// TextBox

export type TextBoxVariants = "left" | "right" | "large" | "";

export interface ITextLayoutBox {
  children?: any;
  variant?: TextBoxVariants;
  [x: string]: any;
}

/**
 * TextBox container used inside TextLayout. Large will try to justifyContent horizontally.
 */
export const TextLayoutBox: React.FC<ITextLayoutBox> = ({ children = null, variant = "", ...props }) => {
  return (
    <div className={`if text layout box${variant ? " " + variant : ""}`} {...props}>
      {children}
    </div>
  );
};

// TextBody
export interface ITextBody {
  children?: any;
  [x: string]: any;
}

/**
 * TextLayoutBody should generally be used inside TextLayout and is how you section the content.
 */
export const TextBody: React.FC<ITextBody> = ({ children = null, ...props }) => {
  return (
    <div className={`if text body`} {...props}>
      {children}
    </div>
  );
};

export default TextLayout;
