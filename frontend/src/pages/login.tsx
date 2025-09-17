import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <section className="flex h-screen flex-col items-center justify-center bg-neutral-200">
      <div className="flex w-1/3 flex-col items-center rounded-md border-2 border-solid border-neutral-400 px-9 py-10 text-neutral-800">
        <p className="text-2xl font-semibold">Login</p>
        <form className="mt-7 flex w-full flex-col gap-7">
          <div className="flex flex-col">
            <label className="text-xl font-medium leading-8" htmlFor="email">
              Email
            </label>
            <input
              required
              className="mt-2 rounded-lg px-4 py-1 outline-neutral-400 placeholder:text-lg placeholder:font-semibold"
              id="email"
              type="email"
              placeholder="example@mail.com"
            />
          </div>
          <div className="relative flex flex-col">
            <label className="text-xl font-medium leading-8" htmlFor="password">
              Password
            </label>
            <input
              required
              className="mt-2 rounded-lg px-4 py-1 outline-neutral-400 placeholder:text-lg placeholder:font-semibold"
              id="password"
              type={showPassword ? "password" : "text"}
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
          <button className="w-full rounded-lg bg-neutral-300 py-2 font-semibold transition-colors hover:bg-neutral-400">
            Log in
          </button>
          <div className="mx-auto mt-2 flex flex-col text-center text-lg font-medium leading-8 text-neutral-500">
            <p>Don´t have an account?</p>
            <p className="">
              <Link
                to="/registration-page"
                className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
