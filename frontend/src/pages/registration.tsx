import { Link } from "react-router-dom";
import { InputField, PasswordField } from "./components";

export const RegistrationPage = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-neutral-200">
      <div className="flex w-1/3 flex-col items-center rounded-md border-2 border-solid border-neutral-400 px-9 py-10 text-neutral-800">
        <p className="text-2xl font-semibold">Sign Up</p>
        <form className="mt-7 flex w-full flex-col gap-7">
          <InputField
            id="name"
            label="Name"
            placeholder="John Doe"
            type="text"
            required
          />
          <InputField
            id="email"
            label="Email"
            placeholder="example@mail.com"
            type="email"
            required
          />
          <PasswordField />
          <div className="flex items-center gap-4">
            <input required type="checkbox" />
            <label className="text-lg font-medium leading-8 text-neutral-500">
              I agree with{" "}
              <span className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600">
                Terms{" "}
              </span>
              and{" "}
              <span className="cursor-pointer text-blue-500 transition-colors hover:text-blue-600">
                Privacy
              </span>
            </label>
          </div>

          <button className="w-full rounded-lg bg-neutral-300 py-2 font-semibold transition-colors hover:bg-neutral-400">
            Sign up
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
      </div>
    </section>
  );
};
