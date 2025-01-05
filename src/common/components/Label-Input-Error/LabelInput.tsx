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

// const LabelInput = ({parentDivClassName, label, type = "text", placeholder, keyName, requiredMessage, patternValue, patternMessage, register, errors, minValue, minMessage, children} : LabelInputType) => {

//   //style for error elements
//   const errorStyle: string = "text-red-700 mt-1 text-sm"; 
//   //style for input elements
//   const inputStyle: string = "bg-slate-700 w-full h-8 rounded-md px-3 md:px-5 py-4 md:py-6 mt-2 border-1 md:border-2 border-slate-700 focus:outline-none focus:ring focus:ring-indigo-500/100 bg-opacity-50 placeholder-gray-600";
//   //style for label elements
//   const labelStyle: string = "text-slate-500 font-normal";

//   return (
//     <div className={parentDivClassName}>
//       <label className={labelStyle}>{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register && {...register(`${keyName}`, {
//           required: { value: true, message: `${requiredMessage} is required` },
//           pattern: {
//             value: patternValue,
//             message: patternMessage,
//           },
//           min: {value: minValue, message: minMessage}
//         })}}
        
//         className={inputStyle}
//       />
//       {children}
//       {errors && errors[keyName] && (
//         <p className={errorStyle}>{errors[keyName].message}</p>
//       )}
//     </div>
//   );
// };

// export default LabelInput;
type LabelInputProps = {
  parentDivClassName?: string;
  label: string;
  type?: string;
  placeholder: string;
  keyName: string;
  requiredMessage?: string;
  patternValue?: RegExp;
  patternMessage?: string;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  minValue?: number;
  minMessage?: string;
  children?: React.ReactNode;
};

const LabelInput: React.FC<LabelInputProps> = ({
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
      {errors?.[keyName]?.message && <p className={errorStyle}>{errors[keyName].message}</p>}
    </div>
  );
};

export default LabelInput;