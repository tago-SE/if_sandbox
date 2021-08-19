export function Legend({ children, ...props }) {
  return (
    <legend className="if" {...props}>
      {children}
    </legend>
  );
}
