import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useToast } from "../hooks/use-toast";
import { CatalogUnit, Header, Toast } from "../shared";
import { fetchProducts } from "../components/store/product/productsAsyncThunks";

export const CatalogPage = () => {
  const { products, status } = useAppSelector(
    (state) => state.delivery.products,
  );
  const dispatch = useAppDispatch();
  const { message, showToast } = useToast();
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);
  
  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      {message && <Toast message={message} />}
      <Header />
      <h1 className="text-2xl font-bold">Catalog</h1>
      <ul className="mt-5 grid grid-cols-3 gap-5">
        {products.map((product) => (
          <li key={product.id}>
            <CatalogUnit product={product} showToast={showToast} />
          </li>
        ))}
      </ul>
    </main>
  );
};
