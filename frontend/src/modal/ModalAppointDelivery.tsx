import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUsers } from "../components/store/users/usersAsyncThunks";
import {
  chooseCourier,
} from "../components/store/users/userSlice";
import { updateOrderCourier } from "../components/store/order/orderAsyncThunks";
import { useParams } from "react-router-dom";
import type { ModalWindowProps } from "../shared/types";

export const ModalAppointDelivery = ({
  handleClick,
}: ModalWindowProps) => {
  const { allUsers, coosenCourier } = useAppSelector(
    (state) => state.delivery.users,
  );
  const { id } = useParams();
  const [submitError, setSubmitError] = useState<string | null>(null);


  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const deliveryPeople = allUsers.filter((user) => user.role === "courier");

  const handleAddCourierToOrder = async () => {
    setSubmitError(null);

    if (!id) return;
    if (!coosenCourier) {
      return setSubmitError("Choose courier");
    }

    try {
      await dispatch(
        updateOrderCourier({
          id: parseInt(id),
          courierId: coosenCourier.id,
          status: "delivering",
        }),
      ).unwrap();
      handleClick();
    } catch (err: unknown) {
      const error = err as { message: string };
      if (error?.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <h2>Choose courier:</h2>
      <div className="grid grid-cols-3 gap-3">
        {deliveryPeople.map((courier) => (
          <article
            onClick={() => {
              dispatch(chooseCourier(courier));
            }}
            key={courier.id}
            className={`flex w-full cursor-pointer ${coosenCourier?.id === courier.id ? "bg-neutral-200" : null} flex-col justify-center gap-2 rounded border border-neutral-700 p-5 text-center text-xl font-semibold hover:bg-neutral-200`}
          >
            <h2>№ {courier.id}</h2>
            <h2>
              Customer:{" "}
              <span className="text-green-800">{courier?.fullName}</span>
            </h2>
            <h2>
              Role: <span className="text-blue-500">{courier.role}</span>
            </h2>
          </article>
        ))}
      </div>
      {submitError && (
        <p role="alert" className="text-center font-bold text-red-500">
          {submitError}
        </p>
      )}
      <button
        onClick={handleAddCourierToOrder}
        className="rounded-md border bg-green-800 p-1 text-white transition-colors hover:bg-green-800/80"
      >
        Set
      </button>
    </section>
  );
};
