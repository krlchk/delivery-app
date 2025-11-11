import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputField } from "./InputField";
import type { PasswordFieldProps } from "./types";

export const PasswordField = ({ setPassword, value,disabled }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col">
      <InputField
        value={value}
        id="password"
        label="Password"
        placeholder="*******"
        type={showPassword ? "text" : "password"}
        required
        onValueChange={setPassword}
        disabled={disabled}
      />
      <button
        className="absolute bottom-1 right-1"
        onClick={(e) => {
          e.preventDefault();
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? (
          <Eye size={22} color="#a3a3a3" />
        ) : (
          <EyeOff size={22} color="#a3a3a3" />
        )}
      </button>
    </div>
  );
};
