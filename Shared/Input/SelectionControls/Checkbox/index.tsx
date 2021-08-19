import { PropTypes } from "mobx-react";
import React from "react";

export interface CheckBoxProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  [x: string]: any;
}

export function Checkbox({ id, name, checked, label, invalid, onChange, ...props }: CheckBoxProps) {
  return (
    <>
      <input
        checked={checked}
        type="checkbox"
        id={id}
        className={`if checkbox${invalid ? " is-invalid" : ""}`}
        name={name}
        onChange={onChange}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </>
  );
}

export interface CheckboxContainerProps {
  children: React.ReactNode;
  horizontal?: boolean;
  style?: React.CSSProperties;
}

export function CheckboxContainer({ children, horizontal = false, style }: CheckboxContainerProps) {
  return (
    <div className={`if checkboxes${horizontal ? " horizontal" : ""}`} style={style}>
      {children}
    </div>
  );
}
