import React, { ReactNode } from "react";

export type HeadingVariants = "largest" | "larger" | "large" | "medium" | "small" | "smallest";

export type HeadingRanks = 1 | 2 | 3 | 4 | 5 | 6;

export interface IHeadingProps {
  children: ReactNode;
  className?: string;
  rank?: HeadingRanks;
  variant?: HeadingVariants;
  center?: boolean;
  [x: string]: any;
}

const headingSizeMap = {
  1: "largest",
  2: "larger",
  3: "large",
  4: "medium",
  5: "small",
  6: "smallest"
};

export function getHeadingRank(size: string) {
  let target = size.toLowerCase();
  for (var prop in headingSizeMap) {
    if (target == headingSizeMap[prop]) return Number(prop);
  }
  return 0;
}

export const Heading: React.FC<IHeadingProps> = ({
  className,
  children,
  rank = 1,
  variant,
  center = false,
  ...props
}) => {
  const HeadingElement: any = "h" + rank;
  return (
    <HeadingElement
      className={`if heading ${variant ? variant : headingSizeMap[rank]}${center ? " center" : ""}${
        className ? " " + className : ""
      }`}
      {...props}
    >
      {children}
    </HeadingElement>
  );
};

export const H1: React.FC<IHeadingProps> = ({ rank = 1, children, variant = "largest", center = false, ...props }) => (
  <Heading rank={rank} variant={variant} center={center} {...props}>
    {children}
  </Heading>
);

export const H2: React.FC<IHeadingProps> = ({ rank = 2, children, variant = "larger", center = false, ...props }) => (
  <Heading rank={rank} variant={variant} center={center} {...props}>
    {children}
  </Heading>
);

export const H3: React.FC<IHeadingProps> = ({ rank = 3, children, variant = "large", center = false, ...props }) => (
  <Heading rank={rank} variant={variant} center={center} {...props}>
    {children}
  </Heading>
);

export const H4: React.FC<IHeadingProps> = ({ rank = 4, children, variant = "medium", center = false, ...props }) => (
  <Heading rank={rank} variant={variant} center={center} {...props}>
    {children}
  </Heading>
);

export const H5: React.FC<IHeadingProps> = ({ rank = 5, children, variant = "small", center = false, ...props }) => (
  <Heading rank={rank} variant={variant} center={center} {...props}>
    {children}
  </Heading>
);

export const H6: React.FC<IHeadingProps> = ({ rank = 6, children, variant = "smallest", center = false, ...props }) => (
  <Heading rank={rank} variant={variant} center={center} {...props}>
    {children}
  </Heading>
);

export interface ITitleHeadingProps extends IHeadingProps {}

export const TitleHeading: React.FC<ITitleHeadingProps> = ({
  children,
  rank = 1,
  center = false,
  variant = "largest",
  ...props
}) => {
  const ShadowHeading: any = "h" + rank;
  return (
    <ShadowHeading className={`if title heading ${variant}${center ? " center" : ""}`} {...props}>
      {children}
    </ShadowHeading>
  );
};

export default Heading;
