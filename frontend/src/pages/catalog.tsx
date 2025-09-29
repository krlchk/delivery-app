import { useAppSelector } from "../app/hooks";
import { CatalogUnit, Header, Toast } from "../shared";
import { useEffect } from "react";
import { useToast } from "../hooks/use-toast";

export const CatalogPage = () => {
  const { products, orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  const { message, showToast } = useToast();

  useEffect(() => {
    if (orderedProducts.length > 0) {
      showToast("Product added to cart");
    }
  }, [orderedProducts, showToast]);

  return (
    <main className="flex h-screen flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <p className="text-2xl font-bold">Catalog</p>
      {message && <Toast message={message} toastColor="bg-green-500" />}
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
    </main>
  );
};
