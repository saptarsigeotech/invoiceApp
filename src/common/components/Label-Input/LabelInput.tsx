import { LabelInputType } from "@/types/types";

const LabelInput: React.FC<LabelInputType> = ({
  parentDivClassName = "",
  label,
  labelStyle,
  inputStyle,
  errorStyle,
  type = "text",
  min,
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
  const defaultErrorStyle = "text-red-700 mt-1 text-sm";
  const defaultInputStyle = "bg-slate-700 w-full h-8 rounded-md px-3 md:px-5 py-4 md:py-6 mt-2 border border-slate-700 focus:outline-none focus:ring focus:ring-indigo-500/100 bg-opacity-50 placeholder-gray-600";
  const defaultLabelStyle = "text-slate-500 font-normal";

  const validationRules = register
    ? register(keyName, {
        ...(requiredMessage && {
          required: { value: true, message: `${requiredMessage} is required` },
        }),
        ...(patternValue && { pattern: { value: patternValue, message: patternMessage || "invalid pattern" } }),
        ...(minValue && { min: { value: minValue, message: minMessage || "value is too small" } }),
      })
    : undefined;

  return (
    <div className={parentDivClassName}>
      {label && <label htmlFor={keyName} className={labelStyle ?? defaultLabelStyle}>
      {label}
      </label>}
      <input
        id={keyName}
        type={type}
        placeholder={placeholder}
        min={min}
        {...validationRules}
        className={inputStyle ?? defaultInputStyle}
      />
      {children}
      {keyName && errors?.[keyName]?.message && typeof errors[keyName].message === "string" && <p className={errorStyle ?? defaultErrorStyle}>{errors[keyName].message}</p>}
    </div>
  );
};

export default LabelInput;