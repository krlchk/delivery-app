import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header, InputField, OrderUnit, Toast } from "../shared";
import { removeAllProductsFromCart } from "../components/store/product/product-slice";
import type { OrderSummaryProps } from "../components/store/types/product.types";
import { useMemo, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { createOrder } from "../components/store/order/order-async-thunks";
import { Navigate } from "react-router-dom";

export const OrderPage = () => {
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  const { user } = useAppSelector((state) => state.delivery.users);
  const totalCost = useMemo(() => {
    return orderedProducts.reduce(
      (acc, { product, amount }) => acc + product.price * amount,
      0,
    );
  }, [orderedProducts]);

  const { message, showToast } = useToast();

  return (
    <>
    {user === null ? <Navigate to="/login-page" /> : <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      {message && <Toast message={message} />}
      <Header />
      <h1 className="text-2xl font-bold">Your Order is</h1>
      {orderedProducts.length !== 0 ? (
        <OrderSummary
          orderedProducts={orderedProducts}
          totalCost={totalCost}
          showToast={showToast}
        />
      ) : (
        <EmptyCartMessage />
      )}
    </main>}
    </>
  );
};

const EmptyCartMessage = () => {
  return (
    <div className="h-screen text-center">
      <p className="mt-10 text-2xl font-bold">Your cart is empty...</p>
    </div>
  );
};

const OrderSummary = ({
  orderedProducts,
  totalCost,
  showToast,
}: OrderSummaryProps) => {
  const dispatch = useAppDispatch();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [submitError, setSubmitError] = useState<null | string>(null);

  const handleRemoveCart = () => {
    dispatch(removeAllProductsFromCart());
    showToast("Order removed");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!deliveryAddress) {
      setSubmitError("Please provide a delivery address.");
      return;
    }

    try {
      await dispatch(
        createOrder({
          deliveryAddress: deliveryAddress,
          items: orderedProducts,
        }),
      ).unwrap();
      dispatch(removeAllProductsFromCart());
      showToast("Order confrimed");
    } catch {
      setSubmitError("Failed to create");
    }
  };

  return (
    <div>
      <p className="mt-5 text-center text-xl font-bold">
        Total cost: <span className="text-green-800">{totalCost}$</span>
      </p>
      <ul className="mt-5 grid grid-cols-3 gap-5">
        {orderedProducts.map((product) => (
          <li key={product.product.id}>
            <OrderUnit
              product={product.product}
              amount={product.amount}
              showToast={showToast}
            />
          </li>
        ))}
      </ul>
      <section>
        <h1 className="mt-5 text-center text-2xl font-bold">
          Your shiping adress
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            id="adress"
            value={deliveryAddress}
            label="Adress"
            onValueChange={setDeliveryAddress}
            placeholder="Enter your adress"
            type="text"
            required
          />
          {submitError && (
            <p role="alert" className="mt-2 text-center font-bold text-red-800">
              {submitError}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-green-800 px-4 py-1 font-semibold text-white transition-colors hover:bg-green-900"
          >
            Place an order
          </button>
        </form>
      </section>
      <button
        onClick={handleRemoveCart}
        className="mt-5 w-full rounded-lg bg-red-800 px-4 py-1 font-semibold text-white transition-colors hover:bg-red-900"
      >
        Delete order
      </button>
    </div>
  );
};
