import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser } from "../components/store/users/users-async-thunks";
import { InputField } from "./input-field";
import { PasswordField } from "./password-field";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.delivery.users);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch {
      setPassword("");
      setSubmitError("Failed to log in. Please check your details.");
    }
  };

  const isLoading = status === "loading";
  return (
    <section className="flex w-1/3 flex-col items-center rounded-md border-2 border-solid border-neutral-400 px-9 py-10 text-neutral-800">
      <h2 className="text-2xl font-semibold">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-7 flex w-full flex-col gap-7"
        aria-busy={isLoading}
      >
        <InputField
          value={email}
          id="email"
          label="Email"
          placeholder="example@mail.com"
          type="email"
          required
          onValueChange={setEmail}
          disabled={isLoading}
        />
        <PasswordField
          value={password}
          setPassword={setPassword}
          disabled={isLoading}
        />
        {submitError && (
          <p role="alert" className="text-center font-bold text-red-500">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-neutral-300 py-2 font-semibold transition-colors hover:bg-neutral-400"
          disabled={isLoading}
        >
          {isLoading ? "Navigating..." : "Log in"}
        </button>
        <div className="mx-auto mt-2 flex flex-col text-center text-lg font-medium leading-8 text-neutral-500">
          <p>Don´t have an account?</p>
          <Link
            to="/registration-page"
            className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};
