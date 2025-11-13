import clsx from "clsx";
import type { HomePageOrderUnitProps } from "./types";

export const HomePageOrderUnit = ({
  orderProps,
  allUsers,
}: HomePageOrderUnitProps) => {
  const { id, status, clientId } = orderProps;

  const user = allUsers?.find((user) => user.id === clientId);

  return (
    <article className="relative flex h-32 w-full cursor-pointer flex-col justify-center gap-2 rounded border border-neutral-700 p-5 text-center text-xl font-semibold hover:bg-neutral-300">
      <h2>№ {id}</h2>
      <h2>
        Customer: <span className="text-green-800">{user?.fullName}</span>
      </h2>
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
