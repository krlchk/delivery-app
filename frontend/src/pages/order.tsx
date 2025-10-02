import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header, OrderUnit, Toast } from "../shared";
import { removeAllProductsFromCart } from "../components/store/product/product-slice";
import type { OrderSummaryProps } from "../components/store/types/product.types";
import { useMemo } from "react";
import { useToast } from "../hooks/use-toast";

export const OrderPage = () => {
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );

  const totalCost = useMemo(() => {
    return orderedProducts.reduce(
      (acc, { product, amount }) => acc + product.price * amount,
      0,
    );
  }, [orderedProducts]);

  const { message, showToast } = useToast();

  return (
    <main className="flex h-screen flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      {message && <Toast message={message} />}
      <Header />
      <h1 className="text-2xl font-bold">Your Order is</h1>
      {orderedProducts.length !== 0 ? (
        <OrderSummary orderedProducts={orderedProducts} totalCost={totalCost} showToast={showToast} />
      ) : (
        <EmptyCartMessage />
      )}
    </main>
  );
};

const EmptyCartMessage = () => {
  return (
    <div className="text-center">
      <p className="mt-10 text-2xl font-bold">Your cart is empty...</p>
    </div>
  );
};

const OrderSummary = ({ orderedProducts, totalCost, showToast }: OrderSummaryProps) => {
  const dispatch = useAppDispatch();
  const handleRemoveCart = () => {
    dispatch(removeAllProductsFromCart());
    showToast("Order removed")
  };
  const handleConfirmOrder = () => {
    dispatch(removeAllProductsFromCart());
    showToast("Order confrimed")
  };

  return (
    <div>
      <p className="mt-5 text-center text-xl font-bold">
        Total cost: <span className="text-green-800">{totalCost}$</span>
      </p>
      <ul className="mt-5 grid grid-cols-3 gap-5">
        {orderedProducts.map((product) => (
          <li key={product.product.id}>
            <OrderUnit product={product.product} amount={product.amount} showToast={showToast} />
          </li>
        ))}
      </ul>
      <button
      onClick={handleConfirmOrder}
      className="mt-5 w-full rounded-lg bg-green-800 px-4 py-1 font-semibold text-white transition-colors hover:bg-green-900">
        Confirm order
      </button>
      <button
        onClick={handleRemoveCart}
        className="mt-5 w-full rounded-lg bg-red-800 px-4 py-1 font-semibold text-white transition-colors hover:bg-red-900"
      >
        Delete order
      </button>
    </div>
  );
};
