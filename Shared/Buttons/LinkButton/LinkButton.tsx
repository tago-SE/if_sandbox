/*
    TODO: implement secondary etc variations of link button...
*/

export interface ILinkButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "tertiary";
  [x: string]: any;
}

/**
 * Don't remeber what the purpose of this was...
 *
 * @warning Component is not yet configured to be episerver friendly...
 */
export const Address: React.FC<ILinkButton> = ({ text, href, variant = "primary", ...props }) => {
  return (
    <a href={href} className={`if button ${variant}`} {...props}>
      {text}
      <span className="if icon ui arrow-right white"></span>
    </a>
  );
};
