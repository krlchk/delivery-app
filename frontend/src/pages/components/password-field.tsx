import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputField } from "./input-field";

type passwordFieldProps = {
  setPassword: (value: string) => void;
  value: string;
};

export const PasswordField = ({ setPassword, value }: passwordFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col">
      <InputField
        value={value}
        id="password"
        label="Password"
        placeholder="at least 8 characteres"
        type={showPassword ? "text" : "password"}
        required
        onValueChange={setPassword}
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
