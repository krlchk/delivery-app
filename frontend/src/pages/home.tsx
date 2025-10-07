import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header } from "../shared";
import { fetchMyOrders } from "../components/store/order/order-async-thunks";
import { MyOrder } from "../shared/homepage-order-unit";

export const HomePage = () => {
  const { status, myOrders } = useAppSelector((state) => state.delivery.orders);
  const dispatch = useAppDispatch();
  console.log(status);
  console.log(myOrders);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, status]);

  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <h1 className="text-2xl font-bold">The status of your orders:</h1>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {myOrders.map((order) => (
          <li key={order.id}>
            <MyOrder orderProps={order} />
          </li>
        ))}
      </ul>
    </main>
  );
};
