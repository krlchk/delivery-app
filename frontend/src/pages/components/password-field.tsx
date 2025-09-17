import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const PasswordField = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col">
      <label className="text-xl font-medium leading-8" htmlFor="password">
        Password
      </label>
      <input
        required
        className="mt-2 rounded-lg px-4 py-1 outline-neutral-400 placeholder:text-lg placeholder:font-semibold"
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="at least 8 characteres"
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
