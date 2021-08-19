import React from "react";
import { IDefaultTagProps } from "./index";

interface ILinkTagProps extends IDefaultTagProps {
  href: string;
  active?: boolean;
  activeStyle?: {
    color?: "yellow" | "mint" | "pink" | "aquamarine" | "interaction darkBlue";
    small?: boolean;
  };
  color?: "yellow" | "mint" | "pink" | "aquamarine" | "interaction darkBlue";
}

const defaultActiveColor = "interaction darkBlue";

export const LinkTag: React.FC<ILinkTagProps> = ({
  name,
  href,
  id,
  active,
  activeStyle,
  color = "",
  small = false,
  ...props
}) => {
  const getColor = () => (active ? activeStyle?.color || defaultActiveColor : color);
  const isSmall = () => (active && activeStyle?.hasOwnProperty("small") ? activeStyle.small : small);
  return (
    <li key={id || name}>
      <a
        href={href}
        className={`if tag${isSmall() ? " small" : ""}${active ? " is-active" : ""} color ${getColor()}`}
        {...props}
      >
        {name}
      </a>
    </li>
  );
};
