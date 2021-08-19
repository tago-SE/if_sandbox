import React from "react";

export { Checkbox } from "./Checkbox";
export { CheckboxContainer } from "./Checkbox";

export interface ISelectionControlProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  [x: string]: any;
}

export function Radio({ id, name, checked, label, invalid, onChange, ...props }: ISelectionControlProps) {
  return (
    <>
      <input
        checked={checked}
        type="radio"
        id={id}
        className={`if selection-control${invalid ? " is-invalid" : ""}`}
        name={name}
        onChange={onChange}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </>
  );
}

export interface IToggleControlProps {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

export function Toggle({ id, name, checked, label, onChange, ...props }: IToggleControlProps) {
  return (
    <>
      <input
        className={`if toggle`}
        name={name}
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </>
  );
}

export interface ISelectionControlGroupProps {
  alignment: "horizontal" | "vertical";
  children: React.ReactNode;
  [x: string]: any;
}

/**
 * @deprecated Deprecated as of v12 of the design-system
 */
export function SelectionControlGroup({ alignment = "horizontal", children, ...props }: ISelectionControlGroupProps) {
  return (
    <div className={`if selection-controls ${alignment}`} {...props}>
      {children}
    </div>
  );
}
