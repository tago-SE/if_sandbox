import React from "react";
import { HorizontalLoader, LoaderColorOptions, LoaderSizeOptions } from "../../Loaders/HorizontalLoader";

export type ButtonSizeOptions = "large" | "";
export type ButtonVariantOption = "primary" | "secondary" | "info" | "tertiary";
export type ButtonTypeOption = "button" | "submit" | "reset";

export interface IButtonLoaderProps {
  color?: LoaderColorOptions;
  size?: LoaderSizeOptions;
  [x: string]: any;
}

export const ButtonLoader: React.FC<IButtonLoaderProps> = ({ loading = true, ...props }) => {
  return <HorizontalLoader loading={loading} {...props} />;
};

const WhiteButtonLoader = <ButtonLoader size="small" color="white" />;
const BlueButtonLoader = <ButtonLoader size="small" color="blue" />;

export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: ButtonTypeOption;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: ButtonSizeOptions;
  variant?: ButtonVariantOption;
  loading?: boolean;
  loaderComponent?: React.ReactNode;
  hovered?: boolean;
  [x: string]: any;
}

/**
 * Button implementation from the if-design-system.
 *
 * @param type Button type
 * @param variant Design variations
 * @param size Can either be large or normal
 * @param className Extra className appended to the class list.
 * @param loading Toggle the loading effect, will hide the children
 * @param loaderComponent component that is rendering during instead of the children
 * @param children Content
 * @param disabled Disables the button
 * @param hovered Will make the :hover effect permanent
 * @param style CSSProperties
 */
export function Button({
  children,
  variant = "primary",
  type = "button",
  className,
  size,
  disabled,
  onClick,
  loading,
  hovered,
  loaderComponent = WhiteButtonLoader,
  style,
  ...props
}: IButtonProps) {
  return (
    <button
      className={`if button ${variant}${size ? " " + size : ""}${hovered ? " is-hovered" : ""}${
        className ? " " + className : ""
      }`}
      disabled={disabled}
      aria-disabled={disabled}
      aria-busy={loading}
      type={type}
      onClick={onClick}
      style={style}
      {...props}
    >
      {loading ? loaderComponent : children}
    </button>
  );
}

/**
 * Button component wrapper.
 * @param children
 */
export function PrimaryButton({ children, ...props }: IButtonProps) {
  return (
    <Button variant="primary" loaderComponent={WhiteButtonLoader} {...props}>
      {children}
    </Button>
  );
}

/**
 * Button component wrapper.
 * @param children
 */
export function SecondaryButton({ children, ...props }: IButtonProps) {
  return (
    <Button variant="secondary" loaderComponent={BlueButtonLoader} {...props}>
      {children}
    </Button>
  );
}

/**
 * Button component wrapper.
 * @param children
 */
export function TertiaryButton({ children, ...props }: IButtonProps) {
  return (
    <Button variant="tertiary" loaderComponent={BlueButtonLoader} {...props}>
      {children}
    </Button>
  );
}

/**
 * Button component wrapper.
 * @param children
 */
export function InfoButton({ children, ...props }: IButtonProps) {
  return (
    <Button variant="info" loaderComponent={WhiteButtonLoader} {...props}>
      {children}
    </Button>
  );
}
