import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { CatalogUnit } from "./components";

export const CatalogPage = () => {
  const { products } = useAppSelector((state) => state.delivery.products);
  const navigate = useNavigate();
  return (
    <section className="flex h-screen flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <p className="text-2xl font-bold">Catalog</p>
      <button
        onClick={() => navigate("/order-page")}
        className="w-full mt-5 rounded-lg bg-neutral-300 px-4 py-1 font-semibold transition-colors hover:bg-neutral-400"
      >
        To your orders
      </button>
      <div className="mt-5 grid grid-cols-3 gap-5">
        {products.map((product) => (
          <CatalogUnit
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};
