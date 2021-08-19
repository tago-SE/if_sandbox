import React from "react";

import { Block, BlockProps } from "../Block";
import { Container } from "../Container";

interface ErrorBlockProps extends BlockProps {
  title: string;
}

export const ErrorBlock: React.FC<ErrorBlockProps> = ({
  children = null,
  title = "Oops... Something went wrong",
  variant = "dark",
  ...props
}) => {
  return (
    <Block variant={variant} {...props}>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {
          <h2 data-anatomy="outline top" className="if heading large center">
            {title}
          </h2>
        }
        <p data-anatomy="outline left" className="if text lead center" style={{ maxWidth: 552 }}>
          {children}
        </p>
      </Container>
    </Block>
  );
};

export default ErrorBlock;
