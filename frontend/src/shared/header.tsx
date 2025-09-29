import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const Header = () => {
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  return (
    <header className="mb-8 flex w-full justify-between border-b border-black p-3 text-xl font-semibold">
      <div>Logo</div>
      <div>
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
        </ul>
      </div>
      <Link to='/login-page'>User</Link>
    </header>
  );
};
