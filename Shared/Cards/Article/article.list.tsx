import React, { ReactNode } from "react";

interface ArticleListProps {
  children: ReactNode;
  [x: string]: any;
}

export const ArticleList: React.FC<ArticleListProps> = ({ children = null, ...props }) => {
  return (
    <ol className="if cards articles" {...props}>
      {children}
    </ol>
  );
};

export default ArticleList;
