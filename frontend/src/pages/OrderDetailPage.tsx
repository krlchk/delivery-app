import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  deleteOrder,
  fetchOrderById,
  updateOrderStatus,
} from "../components/store/order/orderAsyncThunks";
import { Footer, Header, ModalWindow } from "../shared";
import clsx from "clsx";
import { ModalAppointDelivery, ModalCancellation } from "../modal";
import type { IOrderWithItems } from "../components/store/order/types";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentOrder, status, error } = useAppSelector(
    (state) => state.delivery.orders,
  );
  const { user, allUsers } = useAppSelector((state) => state.delivery.users);

  const initialUser = allUsers.find(
    (initUser) => initUser.id === currentOrder?.clientId,
  );

  const chosenCourier = allUsers.find(
    (u) => u.id === currentOrder?.courierId,
  );

  const totalCost = useMemo(() => {
    return currentOrder?.items?.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0,
    );
  }, [currentOrder?.items]);

  const [isCancellationOpen, setIsCancellationOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleModalCancellationClick = () => {
    setIsCancellationOpen(!isCancellationOpen);
  };

  const handleModalDeliveryClick = () => {
    setIsDeliveryOpen(!isDeliveryOpen);
  };

  const handleDelete = async (orderId: number) => {
    try {
      await dispatch(deleteOrder({ id: orderId })).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to delete the order:", error);
    }
  };

  const handleUpdateOrderStatus = async () => {
    setSubmitError(null);

    if (!id) return;
    if (!currentOrder?.courierId) {
      return setSubmitError("Courier is not assigned yet.");
    }

    try {
      await dispatch(
        updateOrderStatus({
          id: parseInt(id),
          status: "completed",
        }),
      ).unwrap();
    } catch (err: unknown) {
      const error = err as { message: string };
      if (error?.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unknown error occurred. Please try again.");
      }
    }
  };

  
  const isOwner = user?.id === currentOrder?.clientId;
  const isAdmin = user?.role === "admin";
  const isAssignedCourier = user?.role === "courier" && user?.id === currentOrder?.courierId;

  const showDeleteBtn =
    (isAdmin || isOwner) &&
    (currentOrder?.status === "cancelled" || currentOrder?.status === "completed");

  const showCancelBtn =
    (isAdmin || isOwner) &&
    currentOrder?.status !== "completed" &&
    currentOrder?.status !== "cancelled";

  const showDeliverBtn =
    isAssignedCourier && currentOrder?.status === "delivering";

  const showAppointBtn =
    isAdmin && (currentOrder?.status === "new" || !currentOrder?.courierId);


  if (status === "loading" || status === "idle") {
    return (
      <main className="flex flex-grow flex-col items-center bg-neutral-200 p-10 text-xl font-semibold text-neutral-700">
        <h1>Loading order...</h1>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="flex flex-grow flex-col items-center bg-neutral-200 p-10 text-xl font-semibold text-neutral-700">
        <h1>Error: {error}</h1>
      </main>
    );
  }

  if (!currentOrder) {
    return (
      <main className="flex flex-grow flex-col items-center bg-neutral-200 p-10 text-xl font-semibold text-neutral-700">
        <h1>Order not found.</h1>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-neutral-200 text-xl font-semibold text-neutral-700">
      <Header />
      <main className="flex flex-grow flex-col gap-3 px-6 py-14 w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold">
          Order Details № {currentOrder.id}
        </h2>
        
        <p className="mt-5">
          Status:{" "}
          <span
            className={clsx("font-bold", {
              "text-red-800": currentOrder.status === "new",
              "text-yellow-700": currentOrder.status === "delivering",
              "text-green-800": currentOrder.status === "completed",
              "text-gray-600": currentOrder.status === "cancelled",
            })}
          >
            {currentOrder.status}
          </span>
        </p>
        
        <p>
          Courier name:{" "}
          {currentOrder.courierId === null ? (
            <span className="font-normal">none</span>
          ) : (
            <span className="font-normal">{chosenCourier?.fullName}</span>
          )}
        </p>
        
        <p>
          Customer name:{" "}
          <span className="font-normal">{initialUser?.fullName}</span>
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

        {submitError && (
          <p role="alert" className="text-center font-bold text-red-500">
            {submitError}
          </p>
        )}

        
        <button
          onClick={() => navigate("../")}
          className="mt-5 w-full rounded-lg border border-neutral-700 bg-neutral-700/30 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-700/50"
        >
          Back
        </button>

        {showCancelBtn && (
          <button
            onClick={handleModalCancellationClick}
            className="mt-1 w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-800"
          >
            Cancel order
          </button>
        )}

        {showDeliverBtn && (
          <button
            onClick={handleUpdateOrderStatus}
            className="mt-1 w-full rounded-lg bg-green-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-800/80"
          >
            Order delivered!
          </button>
        )}

        {showAppointBtn && (
          <button
            onClick={handleModalDeliveryClick}
            className="mt-1 w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Appoint a delivery person
          </button>
        )}

        {showDeleteBtn && (
          <button
            onClick={() => handleDelete(currentOrder.id)}
            className="mt-1 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-800"
          >
            Remove
          </button>
        )}
      </main>

      <Footer />

      <ModalWindow
        isOpen={isCancellationOpen}
        handleClick={handleModalCancellationClick}
        child={
          <ModalCancellation
            isOpen={isCancellationOpen}
            handleClick={handleModalCancellationClick}
          />
        }
      />
      <ModalWindow
        isOpen={isDeliveryOpen}
        handleClick={handleModalDeliveryClick}
        child={<ModalAppointDelivery handleClick={handleModalDeliveryClick} />}
      />
    </div>
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
        {currentOrder.items?.map((item) => (
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