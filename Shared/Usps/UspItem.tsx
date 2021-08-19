import React, { ReactNode } from "react";
import { iconsLoader } from "helpers/icons/IconsLoader";

interface IProps {
  header?: ReactNode;
  content: ReactNode;
  iconClassName?: string;
  style?: React.CSSProperties;
  [x: string]: any;
}

export const UspItem: React.FC<IProps> = ({
  header = "",
  content = undefined,
  key = undefined,
  iconClassName = undefined,
  style = {},
  ...props
}) => {
  let image = undefined;
  if (iconClassName) {
    const icon = iconsLoader.getIconByClassName(iconClassName);
    image = icon ? `url("${icon?.url}")` : undefined; // fallback to default
  }
  return (
    <li
      className={`if quick-fact`}
      style={image ? { backgroundImage: image, paddingBottom: "0px", ...style } : { ...style }}
      {...props}
    >
      {header && <span className="if heading smallest">{header}</span>}
      {content}
    </li>
  );
};
