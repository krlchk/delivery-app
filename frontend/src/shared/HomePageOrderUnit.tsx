import clsx from "clsx";
import type { IMyOrder } from "./types";

export const HomePageOrderUnit = ({ orderProps }: { orderProps: IMyOrder }) => {
  const { id, status } = orderProps;
  return (
    <article className="relative flex h-32 w-full cursor-pointer flex-col justify-center gap-2 rounded border border-neutral-700 p-5 text-center text-xl font-semibold hover:bg-neutral-300">
      {/* {status === "completed" && (
        <button>
          <XMark className="rounded-t-r-md absolute right-0 top-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm bg-neutral-300 text-lg hover:bg-neutral-400" />
        </button>
      )} */}
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
    </article>
  );
};
