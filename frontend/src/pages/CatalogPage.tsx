import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useToast } from "../hooks/useToast";
import { CatalogUnit, Footer, Header, Toast } from "../shared";
import { fetchProducts } from "../components/store/product/productsAsyncThunks";

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { message, showToast } = useToast();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-200 text-neutral-700">
      {message && <Toast message={message} />}
      <Header />
      <CatalogPageMainSection showToast={showToast} />
      <Footer />
    </div>
  );
};

const CatalogPageMainSection = ({
  showToast,
}: {
  showToast: (msg: string) => void;
}) => {
  const { products } = useAppSelector((state) => state.delivery.products);

  return (
    <main className="flex flex-grow flex-col items-center px-6 py-14">
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
