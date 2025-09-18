import type { InputFieldProps } from "./types";

export const InputField = ({
  id,
  label,
  required,
  type,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-xl font-medium leading-8" htmlFor="email">
        {label}
      </label>
      <input
        required={required}
        className="mt-2 rounded-lg px-4 py-1 outline-neutral-400 placeholder:text-lg placeholder:font-semibold"
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
