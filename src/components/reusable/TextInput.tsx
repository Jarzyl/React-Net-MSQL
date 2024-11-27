

import React from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  id?: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors?: FieldErrors;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type,
  id,
  register,
  validation,
  errors,
}) => {
  return (
    <div className="grid justify-center gap-2 mx-auto">
      <label
        htmlFor={id || name}
        className="flex justify-start text-sm text-gray-800 md:text-md xl:text-lg"
      >
        {label}
      </label>
      <input
        {...register(name, validation)}
        id={id || name}
        className={`text-black text-sm md:text-base xl:text-md h-10 w-64 md:w-72 xl:w-80 xl:h-12 border border-gray-300 p-2 rounded-md hover:border-customCyan duration-300 ease-in-out outline-customCyan ${
          errors?.[name] ? "border-red-500 border-2" : "border-gray-300"
        }`}
        type={type}
      />
      {errors?.[name] && (
        <p className="mt-1 text-xs font-bold text-red-500 md:text-md xl:text-base">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextInput;
