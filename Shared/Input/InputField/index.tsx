import { Field } from "formik";
import { InputWrapper } from "../inputWrapper";
import { Label } from "../label";

type FieldTypes = "tel" | "text" | "email"; // add here

interface Props {
  type: FieldTypes;
  id: string;
  required?: boolean;
  invalid?: boolean;
  busy?: boolean;
  errorMessage?: string;
  spellCheck?: boolean;
  placeholder?: string;
  label: React.ReactNode;
  dataSize?: "large" | "larger" | "largest" | "small" | "smaller" | "smallest";
}

interface InputErrorProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const InputError = ({ children, style }: InputErrorProps) => {
  return (
    <span className="if input-error" data-cy="input-error" style={style}>
      {children}
    </span>
  );
};

export const InputField = ({
  type,
  id,
  required,
  invalid,
  busy,
  errorMessage,
  dataSize,
  spellCheck,
  label,
  placeholder
}: Props) => {
  return (
    <InputWrapper>
      <Field
        className={`if input-field${invalid ? " is-invalid" : ""}`}
        type={type}
        name={id}
        id={id}
        disabled={busy}
        aria-busy={busy}
        spellCheck={spellCheck}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        invalid={invalid?.toString()}
        aria-invalid={invalid}
        data-size={dataSize}
      />
      <Label htmlFor={id}>{label}</Label>
      <InputError style={{ visibility: invalid ? "visible" : "hidden", position: "absolute", bottom: "-2rem" }}>
        {errorMessage}
      </InputError>
    </InputWrapper>
  );
};
