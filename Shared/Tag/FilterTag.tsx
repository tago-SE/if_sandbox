import React from "react";
import { IDefaultTagProps } from "./index";

interface IFilterTagProps extends IDefaultTagProps {}

export const FilterTag: React.FC<IFilterTagProps> = ({ name, id, small = false, ...props }) => {
  return (
    <li key={id || name}>
      <button type="button" className={`if tag${small ? " small" : ""}`} {...props}>
        {name}
      </button>
    </li>
  );
};
