import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { registerUser } from "../components/store/users/users-async-thunks";
import { InputField } from "./input-field";
import { PasswordField } from "./password-field";

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.delivery.users);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      await dispatch(
        registerUser({ email, full_name, password, phone_number }),
      ).unwrap();
      navigate("/login-page");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("An error occurred. Please try again.");
      }
    }
  };

  const isLoading = status === "loading";
  return (
    <section className="flex w-1/3 flex-col items-center rounded-md border-2 border-solid border-neutral-400 px-9 py-10 text-neutral-800">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-7 flex w-full flex-col gap-7">
        <InputField
          disabled={isLoading}
          value={full_name}
          onValueChange={setName}
          id="name"
          label="Name"
          placeholder="John Doe"
          type="text"
          required
        />
        <InputField
          disabled={isLoading}
          value={phone_number}
          onValueChange={setNumber}
          id="phone"
          label="Phone number"
          placeholder="000-000-00-00"
          type="text"
          required
        />
        <InputField
          disabled={isLoading}
          value={email}
          onValueChange={setEmail}
          id="email"
          label="Email"
          placeholder="example@mail.com"
          type="email"
          required
        />
        <PasswordField
          disabled={isLoading}
          setPassword={setPassword}
          value={password}
        />
        <div className="flex items-center gap-4">
          <input required type="checkbox" id="terms-agree" />
          <label
            htmlFor="terms-agree"
            className="text-lg font-medium leading-8 text-neutral-500"
          >
            I agree with{" "}
            <a className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600">
              Terms{" "}
            </a>
            and{" "}
            <a className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600">
              Privacy
            </a>
          </label>
        </div>
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
          {isLoading ? "Registration..." : "Sign up"}
        </button>
        <div className="mx-auto mt-2 flex flex-col text-center text-lg font-medium leading-8 text-neutral-500">
          <p>Already have an account?</p>
          <Link
            to="/login-page"
            className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};
