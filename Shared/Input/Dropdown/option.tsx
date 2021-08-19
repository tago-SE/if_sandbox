export interface IOptionProps {
  value: string | number;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
  [x: string]: any;
}

/**
 * Wrapper for HTMLOptionElement element.
 *
 * @param value - The returned response value when selected.
 * @param label - Displayed text.
 * @param hidden - Hides the option from view.
 * @param disabled - Makes the option unclickable.
 */
export function Option({ value, disabled, hidden, label, ...props }: IOptionProps) {
  return <option className="if" value={value} disabled={disabled} hidden={hidden} label={label} {...props} />;
}
