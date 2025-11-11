import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useMemo } from "react";
import { fetchOrderById } from "../components/store/order/orderAsyncThunks";
import { Header } from "../shared";
import clsx from "clsx";
import type { IOrderWithItems } from "../components/store/order/types";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentOrder, status, error } = useAppSelector(
    (state) => state.delivery.orders,
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(parseInt(id)));
    }
  }, [dispatch, id]);

  const totalCost = useMemo(() => {
    return currentOrder?.items?.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0,
    );
  }, [currentOrder?.items]);

  if (status === "loading" || status === "idle") {
    return (
      <main>
        <h1>Loading order...</h1>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main>
        <h1>Error: {error}</h1>
      </main>
    );
  }

  if (!currentOrder) {
    return (
      <main>
        <h1>Order not found.</h1>
      </main>
    );
  }
  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-xl font-semibold text-neutral-700">
      <Header />
      <section className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-bold">
          Order Details № {currentOrder.id}
        </h1>
        <p className="mt-5">
          Status:{" "}
          <span
            className={clsx("font-bold", {
              "text-red-800": currentOrder.status === "new",
              "text-yellow-700": currentOrder.status === "delivering",
              "text-green-800": currentOrder.status === "completed",
            })}
          >
            {currentOrder.status}
          </span>
        </p>
        <p>
          Address:{" "}
          <span className="font-normal">{currentOrder.deliveryAddress}</span>
        </p>
        <p>
          Total cost:{" "}
          <span className="font-bold text-green-800">{totalCost}$</span>
        </p>
        <OrderDetailProducts currentOrder={currentOrder} />
        <button className="mt-5 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-800">
          Cancel order
        </button>
        {currentOrder.status === "completed" && (
          <section className="mt-5 text-center">
            <p className="text-green-800">Order completed!</p>
            <button className="w-full mt-2 rounded-lg bg-green-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-900">
              Clear order
            </button>
          </section>
        )}
      </section>
    </main>
  );
};

const OrderDetailProducts = ({
  currentOrder,
}: {
  currentOrder: IOrderWithItems;
}) => {
  return (
    <section className="w-full">
      <h2>Items:</h2>
      <ul className="mt-2 flex flex-col gap-3 rounded-md border border-neutral-700 p-2">
        {currentOrder.items.map((item) => (
          <li key={item.productId}>
            <div className="flex items-center gap-2">
              <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-white">
                <img
                  className="h-28 w-28 object-contain"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <span className="font-normal">{item.name}</span> - {item.quantity}{" "}
              x <span className="font-bold text-green-800">{item.price}$</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
