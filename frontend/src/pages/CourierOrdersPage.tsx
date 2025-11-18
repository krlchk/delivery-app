import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Footer, Header } from "../shared";
import { HomePageOrderUnit } from "../shared/HomePageOrderUnit";
import { useEffect } from "react";
import {
  fetchMyOrders,
  fetchOrders,
} from "../components/store/order/orderAsyncThunks";
import { fetchUsers } from "../components/store/users/usersAsyncThunks";

export const CourierOrdersPage = () => {
  const { status: ordersStatus, allUsersOrders } = useAppSelector(
    (state) => state.delivery.orders,
  );
  const {
    status: usersStatus,
    user,
    allUsers,
  } = useAppSelector((state) => state.delivery.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyOrders());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const assignedOrders = allUsersOrders.filter(
    (order) => order.courierId === user?.id,
  );

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
      <main className="flex flex-grow flex-col items-center px-6 py-14">
        {user?.role === "courier" && (
          <>
            <h2 className="mt-5 text-2xl font-bold">
              The status of orders assigned to you:
            </h2>
            <ul className="mt-5 grid grid-cols-3 gap-3">
              {assignedOrders.map((order) => (
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
      <Footer />
    </div>
  );
};
