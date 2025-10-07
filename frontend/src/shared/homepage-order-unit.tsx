import clsx from "clsx";
import type { IMyOrder } from "./shared.types";

export const MyOrder = ({ orderProps }: { orderProps: IMyOrder }) => {
  const { id, status } = orderProps;
  return (
    <article className="flex h-full w-full flex-col justify-center gap-2 rounded border border-neutral-700 p-5 text-center text-xl font-semibold">
      <h2>№ {id}</h2>
      <h2>
        Status:{" "}
        <span
          className={clsx({
            "text-red-800": status === "new",
            "text-yellow-700": status === "delivering",
            "text-green-800": status === "completed",
          })}
        >
          {status}
        </span>
      </h2>
      {status === "completed" && <button className="bg-stone-300 hover:bg-stone-400 rounded-sm text-lg p-2 mt-3">X</button>}
      {/* <h3>
        Delivery Adress:{` `}
        <span className="font-normal">{deliveryAddress}</span>
      </h3>
      <h3>
        Creation date:{` `}
        <span className="font-normal">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </h3>
      <h3>
        Creation time:{` `}
        <span className="font-normal">
          {new Date(createdAt).toLocaleTimeString()}
        </span>
      </h3> */}
    </article>
  );
};
