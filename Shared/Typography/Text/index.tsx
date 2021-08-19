import React, { ReactNode } from "react";

export const Text: React.FC<{ children?: ReactNode; [x: string]: any }> = ({ children = null, ...props }) => {
  return (
    <p className={`if text`} {...props}>
      {children}
    </p>
  );
};

export interface ITextLead {
  children?: ReactNode;
  center?: boolean;
  [x: string]: any;
}

export const LeadText: React.FC<ITextLead> = ({ children = null, center = false, ...props }) => {
  return (
    <p className={`if text lead${center ? " center" : ""}`} {...props}>
      {children}
    </p>
  );
};

export default Text;
