import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const Header = () => {
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  return (
    <section className="mb-8 flex w-full items-center justify-center gap-5 border-b border-black p-3 text-xl font-semibold">
      <Link className="hover:underline" to="/">
        Homepage
      </Link>
      <Link className="hover:underline" to="/catalog-page">
        Catalog
      </Link>
      <div className="flex cursor-pointer items-center gap-2 hover:underline">
        <Link to="/order-page">Order</Link>
        {orderedProducts.length > 0 && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-red-800 text-lg">
            {orderedProducts.length}
          </div>
        )}
      </div>
    </section>
  );
};
