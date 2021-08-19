export function Fieldset({ children, ...props }) {
  return (
    <fieldset className="if" {...props}>
      {children}
    </fieldset>
  );
}
