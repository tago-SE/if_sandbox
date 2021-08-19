import React from "react";
import { InputWrapper } from "../inputWrapper";
import { Option, IOptionProps } from "./option";
import { Label } from "../index";
export type { IOptionProps } from "./option";
export { Option } from "./option";

export interface IDropdownProps {
  id: string;
  name: string;
  label: string;
  options: Array<IOptionProps>;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  closed?: boolean;
  placeholder?: string;
  selectedValue?: string | number;
  fieldSize?: "smallest" | "smaller" | "small" | "medium" | "large" | "largest" | "fluid" | string;
  onChange?: (event?: React.ChangeEvent<HTMLSelectElement>) => void;
  [x: string]: any;
}

/**
 * Wrapper for HTMLSelectElement. To show the placeholder the selectedValue needs to be empty. To get the changed value use the onChange callback with the argument.
 * Example: onChange={(e) => changedTo = e.target.value}.
 *
 * @param id
 * @param name
 * @param label
 * @param options
 * @param required
 * @param disabled
 * @param invalid
 * @param closed
 * @param placeholder
 * @param selectedValue
 * @param onSelection
 * @param onChange
 */
export function Dropdown({
  id,
  name,
  label,
  required,
  disabled,
  invalid,
  closed,
  options,
  placeholder,
  selectedValue,
  fieldSize,
  onChange,
  ...props
}: IDropdownProps) {
  function getFieldSize() {
    if (!fieldSize) return "medium";
    if (fieldSize === "fluid") return "smallest | small | small | medium | large | largest";
    return fieldSize;
  }

  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <select
        {...props}
        className={`if dropdown${invalid ? " is-invalid" : ""}${disabled ? " is-disabled" : ""}${
          closed ? " is-closed" : ""
        }${!selectedValue ? " is-unselected" : ""}`}
        id={id}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          if (onChange) onChange(e);
        }}
        disabled={disabled}
        required={required}
        defaultValue={selectedValue || ""}
        data-size={getFieldSize()}
      >
        {!selectedValue && <Option disabled hidden value="" label={placeholder || ""} />}
        {options?.map((o, index) => (
          <Option {...o} key={index} />
        ))}
      </select>
    </InputWrapper>
  );
}
