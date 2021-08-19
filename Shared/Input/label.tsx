import React from "react";

export interface ILabelProps extends React.LabelHTMLAttributes<any> {
  htmlFor?: string;
  form?: string;
  children: any;
  [x: string]: any;
}

export function Label({ htmlFor, form, children, ...props }: ILabelProps) {
  return (
    <label className="if" form={form} htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
}
