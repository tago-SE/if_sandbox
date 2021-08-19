import React, { ReactNode, Key } from "react";

export { FilterTag } from "./FilterTag";
export { InputTag } from "./InputTag";
export { StatusTag } from "./StatusTag";
export { LinkTag } from "./LinkTag";

export interface IDefaultTagProps {
  name: string;
  id?: string;
  small?: boolean;
  [x: string]: any;
}

interface ITagProps extends IDefaultTagProps {
  color?: "yellow" | "mint" | "pink" | "aquamarine";
  onClick?: any;
}

export const Tag: React.FC<ITagProps> = ({ name, id, color = "", small = false, onClick = undefined, ...props }) => {
  return (
    <li key={id || name}>
      <span
        className={`if tag${small ? " small" : ""} ${color}`}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {name}
      </span>
    </li>
  );
};

interface ITagContainerProps {
  children: ReactNode;
  [x: string]: any;
}

export const TagContainer: React.FC<ITagContainerProps> = ({ children, ...props }) => (
  <ul className="if tags" {...props}>
    {children}
  </ul>
);
