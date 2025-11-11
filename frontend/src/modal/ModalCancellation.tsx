import { useEffect, useState } from "react";
import type { ModalWindowProps } from "../shared/types";
import { useAppDispatch } from "../app/hooks";
import { createCancellation } from "../components/store/cancellation/cancellationAsyncThuncs";
import { useParams } from "react-router-dom";

export const ModalCancellation = ({
  handleClick,
  isOpen,
}: ModalWindowProps) => {
  const [reason, setReason] = useState("");

  const [submitError, setSubmitError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (isOpen) {
      setReason("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      if (id) {
        await dispatch(
          createCancellation({ orderId: parseInt(id), reason }),
        ).unwrap();
        handleClick();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-xl">Are you sure you want to cancel the order? </h1>
      <p className="mt-5 text-lg">Why?</p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full rounded-md border p-2 outline-none"
        placeholder="The reason..."
      />
      {submitError && (
        <p role="alert" className="text-center font-bold text-red-500">
          {submitError}
        </p>
      )}
      <div className="flex justify-between text-white">
        <button
          onClick={handleSubmit}
          className="w-1/2 rounded-md border bg-green-800 p-1 transition-colors hover:bg-green-800/80"
        >
          Yes
        </button>
        <button
          onClick={handleClick}
          className="w-1/2 rounded-md border bg-orange-500 p-1 hover:bg-orange-800"
        >
          No
        </button>
      </div>
    </section>
  );
};
