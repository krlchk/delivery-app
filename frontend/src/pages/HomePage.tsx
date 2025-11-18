import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Footer, Header } from "../shared";
import {
  fetchMyOrders,
  fetchOrders,
} from "../components/store/order/orderAsyncThunks";
import { Link } from "react-router-dom";
import { HomePageOrderUnit } from "../shared/HomePageOrderUnit";
import { fetchUsers } from "../components/store/users/usersAsyncThunks";

export const HomePage = () => {
  const { status: ordersStatus } = useAppSelector(
    (state) => state.delivery.orders,
  );
  const { status: usersStatus } = useAppSelector(
    (state) => state.delivery.users,
  );
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
      <div className="flex flex-grow flex-col items-center bg-neutral-200 p-10 text-neutral-700">
        <Header />
        <h2 className="mt-5 text-2xl font-bold">Loading data...</h2>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-200 text-neutral-700">
      <Header />
      <HomePageMainSection />
      <Footer />
    </div>
  );
};

const HomePageMainSection = () => {
  const { myOrders, allUsersOrders } = useAppSelector(
    (state) => state.delivery.orders,
  );
  const { user, allUsers } = useAppSelector((state) => state.delivery.users);
  return (
    <main className="flex flex-grow flex-col items-center px-6 py-14">
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
