import React from "react";

interface InputWrapperProps {
  children: any;
  className?: string;
  [x: string]: any;
}
export function InputWrapper({ children, className = "", ...props }: InputWrapperProps) {
  return (
    <div className={`if input-wrapper${className ? " " + className : ""}`} {...props}>
      {children}
    </div>
  );
}
