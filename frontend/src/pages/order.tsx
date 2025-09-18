import { useAppDispatch, useAppSelector } from "../app/hooks";
import { OrderUnit } from "./components";
import { removeAllProductsFromCart } from "../components/store/product/product-slice";
import { Header } from "./components/header";

export const OrderPage = () => {
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  const dispatch = useAppDispatch();

  const handleRemoveCart = () => {
    dispatch(removeAllProductsFromCart());
  };

  const totalCost = orderedProducts.reduce(
    (acc, { product, amount }) => acc + product.price * amount,
    0,
  );

  return (
    <section className="flex h-screen flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <p className="text-2xl font-bold">Your Order is</p>
      {orderedProducts.length !== 0 ? (
        <div>
          <p className="mt-5 text-center text-xl font-bold">
            Total cost: <span className="text-green-800">{totalCost}$</span>
          </p>
          <div className="mt-5 grid grid-cols-3 gap-5">
            {orderedProducts.map((product) => (
              <OrderUnit
                key={product.product.id}
                product={product.product}
                amount={product.amount}
              />
            ))}
          </div>
          <button className="mt-5 w-full rounded-lg bg-green-600 px-4 py-1 font-semibold text-white transition-colors hover:bg-green-800">
            Confirm order
          </button>
          <button
            onClick={handleRemoveCart}
            className="mt-5 w-full rounded-lg bg-red-500 px-4 py-1 font-semibold text-white transition-colors hover:bg-red-900"
          >
            Delete order
          </button>
        </div>
      ) : (
        <div>
          <p className="mt-10 text-2xl font-bold">Your cart is empty...</p>
        </div>
      )}
    </section>
  );
};
