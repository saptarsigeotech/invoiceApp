import { FieldErrors, UseFormRegister } from "react-hook-form";

type LabelInputType = {
    parentDivClassName ?: string | undefined,
    label: string,
    type?: string,
    placeholder: string, 
    keyName?: string, 
    requiredMessage?: string, 
    patternValue?: RegExp | undefined, 
    patternMessage?: string | undefined, 
    register?: UseFormRegister<any>;
    errors?: FieldErrors<any>;
    minValue?: number,
    minMessage?: string,
    children?: React.ReactElement;
}

const LabelInput: React.FC<LabelInputType> = ({
  parentDivClassName = "",
  label,
  type = "text",
  placeholder,
  keyName,
  requiredMessage,
  patternValue,
  patternMessage,
  register,
  errors,
  minValue,
  minMessage,
  children,
}) => {
  const errorStyle = "text-red-700 mt-1 text-sm";
  const inputStyle =
    "bg-slate-700 w-full h-8 rounded-md px-3 md:px-5 py-4 md:py-6 mt-2 border border-slate-700 focus:outline-none focus:ring focus:ring-indigo-500/100 bg-opacity-50 placeholder-gray-600";
  const labelStyle = "text-slate-500 font-normal";

  const validationRules = register
    ? register(keyName, {
        ...(requiredMessage && {
          required: { value: true, message: `${requiredMessage} is required` },
        }),
        ...(patternValue && { pattern: { value: patternValue, message: patternMessage || "Invalid pattern" } }),
        ...(minValue && { min: { value: minValue, message: minMessage || "Value is too small" } }),
      })
    : undefined;

  return (
    <div className={parentDivClassName}>
      <label htmlFor={keyName} className={labelStyle}>
        {label}
      </label>
      <input
        id={keyName}
        type={type}
        placeholder={placeholder}
        {...validationRules}
        className={inputStyle}
      />
      {children}
      {keyName && errors?.[keyName]?.message && <p className={errorStyle}>{errors[keyName].message}</p>}
    </div>
  );
};

export default LabelInput;