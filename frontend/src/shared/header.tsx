import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { UserIcon, LogoIcon } from "../icons";

export const Header = () => {
  const state = useAppSelector((state) => state.delivery);
  const destination = state.users.user !== null ? "/user-page" : "/login-page";
  return (
    <header className="mb-8 flex w-full items-center justify-between border-b border-black p-3 text-xl font-semibold">
      <Link to="/">
        <LogoIcon className="h-12 w-12" />
      </Link>
      <nav>
        <ul className="flex items-center justify-center gap-5">
          <li className="hover:underline">
            <Link to="/">Homepage</Link>
          </li>
          <li className="hover:underline">
            <Link to="/catalog-page">Catalog</Link>
          </li>
          <li className="flex cursor-pointer items-center gap-2 hover:underline">
            <Link to="/order-page">Order</Link>
            {state.products.orderedProducts.length > 0 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-red-800 text-lg">
                {state.products.orderedProducts.length}
              </div>
            )}
          </li>
        </ul>
      </nav>
      <Link to={destination}>
        <UserIcon className="h-12 w-12" />
      </Link>
    </header>
  );
};
