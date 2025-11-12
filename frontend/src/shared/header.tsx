import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { UserIcon, LogoIcon } from "../icons";
import { ModalWindow } from "./ModalWindow";
import { useState } from "react";
import { ModalCreateProduct } from "../modal/ModalCreateProduct";

export const Header = () => {
  const { user } = useAppSelector((state) => state.delivery.users);
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  const destination = user !== null ? "/user-page" : "/login-page";
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="mb-8 flex w-full items-center justify-between border-b border-black p-3 text-xl font-semibold">
      <Link className="flex flex-col items-center justify-center" to="/">
        <LogoIcon className="h-12 w-12" />
        <h3 className="text-center text-sm font-bold text-red-800">Admin</h3>
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
            {orderedProducts.length > 0 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-red-800 text-lg">
                {orderedProducts.length}
              </div>
            )}
          </li>
          {user?.role === "admin" && (
            <li>
              <button
                onClick={handleClick}
                className="text-red-800 hover:underline"
              >
                Create product
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Link to={destination}>
        <UserIcon className="h-12 w-12" />
      </Link>
      <ModalWindow
        handleClick={handleClick}
        isOpen={isOpen}
        child={<ModalCreateProduct handleClick={handleClick} />}
      />
    </header>
  );
};
