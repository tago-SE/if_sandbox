import React, { ReactNode } from "react";

/**
 *  With given attributes (data-size), you can vary the length of the input field.
 * For optimal usability, use a size that corresponds with the type/amount of characters in the text-field.
 * For example, the field for a postal code containing a maximum of 5 characters should use the attribute data-size="small"
 */
export enum FieldSize {
  Smallest = "smallest",
  Smaller = "smaller",
  Small = "small",
  Large = "large",
  Larger = "larger",
  Largest = "largest",
  DynamicFullRange = "[smallest|smaller|small|large|larger|largest]"
}

export enum FieldState {
  Valid,
  Invalid,
  Complete,
  Closed
}

export enum FieldType {
  Text = "text",
  Number = "number",
  Email = "email",
  Phone = "tel",
  TextArea = "textarea"
}

interface IFieldInputProp {
  value?: any;
  type: FieldType;
  state: FieldState;

  headerValue: string;
  placeholder: string;
  helpText?: string;
  helpTooltip?: string;
  name: string; // Meta info
  id: string; // Meta info

  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: string;
  dataSize?: FieldSize;
  children?: ReactNode;
}

export const IFFormLabel: React.FC<{
  htmlFor: string;
  title: string;
  tooltip?: string;
  [x: string]: any;
}> = (props) => {
  return (
    <label className="if help" htmlFor={props.htmlFor} {...props}>
      {props.title}
      {props.tooltip ? <button type="button" className="if help-tooltip" aria-label={props.tooltip} /> : null}
    </label>
  );
};

export const IFInputHelp: React.FC<{ [x: string]: any }> = (props) => {
  return (
    <span className="if input-help" {...props} data-cy="input-help">
      {props.children}
    </span>
  );
};

export const IFInputError: React.FC<{ [x: string]: any }> = (props) => {
  return (
    <span className="if input-error" {...props} data-cy="input-error">
      {props.children}
    </span>
  );
};

export const IFInputWrapper = ({ children = null, ...props }) => {
  return (
    <div className="if input-wrapper" {...props}>
      {children}
    </div>
  );
};
