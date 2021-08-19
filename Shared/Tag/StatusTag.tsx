import React from "react";
import { IDefaultTagProps } from "./index";

interface IStatusTagProps extends IDefaultTagProps {
  status: "error" | "warning" | "success";
}

export const StatusTag: React.FC<IStatusTagProps> = ({ name, status, id, small = false, ...props }) => {
  return (
    <li key={id || name}>
      <span className={`if tag status${small ? " small" : ""} ${status}`} {...props}>
        {name}
      </span>
    </li>
  );
};
