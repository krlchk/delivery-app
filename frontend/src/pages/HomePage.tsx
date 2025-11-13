import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Header } from "../shared";
import {
  fetchMyOrders,
  fetchOrders,
} from "../components/store/order/orderAsyncThunks";
import { Link } from "react-router-dom";
import { HomePageOrderUnit } from "../shared/HomePageOrderUnit";
import { fetchUsers } from "../components/store/users/usersAsyncThunks";

export const HomePage = () => {
  const {
    myOrders,
    allUsersOrders,
    status: ordersStatus,
  } = useAppSelector((state) => state.delivery.orders);
  const {
    user,
    allUsers,
    status: usersStatus,
  } = useAppSelector((state) => state.delivery.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (
    usersStatus === "loading" ||
    ordersStatus === "loading" ||
    usersStatus === "idle" ||
    ordersStatus === "idle"
  ) {
    return (
      <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
        <Header />
        <h2 className="mt-5 text-2xl font-bold">Loading data...</h2>
      </main>
    );
  }
  
  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <h2 className="text-2xl font-bold">The status of your orders:</h2>
      <ul className="mt-5 grid grid-cols-3 gap-3">
        {myOrders.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>
              <HomePageOrderUnit allUsers={allUsers} orderProps={order} />
            </Link>
          </li>
        ))}
      </ul>
      {user?.role === "admin" && (
        <>
          <h2 className="mt-5 text-2xl font-bold">
            The status of all users orders:
          </h2>
          <ul className="mt-5 grid grid-cols-3 gap-3">
            {allUsersOrders.map((order) => (
              <li key={order.id}>
                <Link to={`/orders/${order.id}`}>
                  <HomePageOrderUnit allUsers={allUsers} orderProps={order} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};
