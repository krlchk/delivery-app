import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header } from "../shared";
import { fetchMyOrders } from "../components/store/order/orderAsyncThunks";
import { Link } from "react-router-dom";
import { HomePageOrderUnit } from "../shared/HomePageOrderUnit";

export const HomePage = () => {
  const { myOrders } = useAppSelector((state) => state.delivery.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <h1 className="text-2xl font-bold">The status of your orders:</h1>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {myOrders.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>
              <HomePageOrderUnit orderProps={order} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
