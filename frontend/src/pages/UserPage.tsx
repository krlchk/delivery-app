import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutUser } from "../components/store/users/userSlice";
import { Header } from "../shared";
import { removeAllProductsFromCart } from "../components/store/product/productSlice";

export const UserPage = () => {
  const { user } = useAppSelector((state) => state.delivery.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogoutUser = () => {
    dispatch(logoutUser());
    dispatch(removeAllProductsFromCart());
    navigate("/login-page");
  };
  return (
    <main className="flex h-full flex-col bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <h1 className="text-center text-2xl font-bold">Your page</h1>
      <section className="mt-2 flex flex-col gap-3 text-xl font-medium">
        <p>
          Name: <span className="font-normal">{user?.fullName}</span>
        </p>
        <p>
          Number: <span className="font-normal">{user?.phoneNumber}</span>
        </p>
        <p>
          Email: <span className="font-normal">{user?.email}</span>
        </p>
        <p>
          Your role: <span className="font-normal">{user?.role}</span>
        </p>
        <button
          onClick={handleLogoutUser}
          className="mt-5 w-1/3 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-800"
        >
          Logout
        </button>
      </section>
    </main>
  );
};
