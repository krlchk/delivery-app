import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const Footer = () => {
  const { user } = useAppSelector((state) => state.delivery.users);
  return (
    <footer className="flex w-full items-center justify-between border-t border-black p-5 py-10 text-xl font-semibold">
      <p>©2025 Delivery. Crafted with a modern vintage spirit.</p>
      <nav>
        <ul className="flex items-center justify-center gap-5">
          <li className="hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline">
            <Link to={user !== null ? "/user-page" : "/login-page"}>Login</Link>
          </li>
          <li className="hover:underline">
            <Link to={user !== null ? "/user-page" : "/registration-page"}>
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
