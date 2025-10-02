import { useAppSelector } from "../app/hooks";
import { Header } from "../shared";

export const UserPage = () => {
  const { user } = useAppSelector((state) => state.delivery.users);
  return (
    <main className="flex h-full flex-col bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <h1 className="text-center text-2xl font-bold">User`s page</h1>
      <section className="mt-2 flex flex-col gap-3 text-xl font-medium">
        <p>
          Name: <span className="font-normal">{user?.full_name}</span>
        </p>
        <p>
          Number: <span className="font-normal">{user?.phone_number}</span>
        </p>
        <p>
          Email: <span className="font-normal">{user?.email}</span>
        </p>
        <p>
          Your role: <span className="font-normal">{user?.role}</span>
        </p>
      </section>
    </main>
  );
};
