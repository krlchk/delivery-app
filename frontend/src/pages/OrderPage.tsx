import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Footer, Header, InputField, OrderUnit, Toast } from "../shared";
import { removeAllProductsFromCart } from "../components/store/product/productSlice";
import { useMemo, useState } from "react";
import { useToast } from "../hooks/useToast";
import { createOrder } from "../components/store/order/orderAsyncThunks";
import { Navigate, useNavigate } from "react-router-dom";
import { resetOrderStatus } from "../components/store/order/orderSlice";
import type { OrderSummaryProps } from "../components/store/product/types";

export const OrderPage = () => {
  const { user } = useAppSelector((state) => state.delivery.users);
  const { message, showToast } = useToast();

  return (
    <>
      {user === null ? (
        <Navigate to="/login-page" />
      ) : (
        <div className="flex min-h-screen flex-col items-center bg-neutral-200 text-neutral-700">
          {message && <Toast message={message} />}
          <Header />
          <OrderPageMainSection showToast={showToast} />
          <Footer />
        </div>
      )}
    </>
  );
};

const OrderPageMainSection = ({
  showToast,
}: {
  showToast: (msg: string) => void;
}) => {
  const { orderedProducts } = useAppSelector(
    (state) => state.delivery.products,
  );
  const totalCost = useMemo(() => {
    return orderedProducts.reduce(
      (acc, { product, amount }) => acc + product.price * amount,
      0,
    );
  }, [orderedProducts]);
  return (
    <main className="flex flex-grow flex-col items-center px-6 py-14">
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

const OrderSummary = ({
  orderedProducts,
  totalCost,
  showToast,
}: OrderSummaryProps) => {
  const dispatch = useAppDispatch();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [submitError, setSubmitError] = useState<null | string>(null);
  const navigate = useNavigate();

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

      dispatch(resetOrderStatus());
      navigate("/");
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
      <section className="flex flex-col items-center text-center">
        <h1 className="mt-5 text-2xl font-bold">Your shiping adress</h1>
        <form
          className="flex w-full flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-1/3">
            <InputField
              id="adress"
              value={deliveryAddress}
              label="Adress"
              onValueChange={setDeliveryAddress}
              placeholder="Enter your adress"
              type="text"
              required
            />
          </div>

          {submitError && (
            <p role="alert" className="mt-2 text-center font-bold text-red-800">
              {submitError}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 w-1/3 rounded-lg bg-green-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-900"
          >
            Place an order
          </button>
        </form>
        <button
          onClick={handleRemoveCart}
          className="mt-5 w-1/3 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-800"
        >
          Delete order
        </button>
      </section>
    </div>
  );
};
