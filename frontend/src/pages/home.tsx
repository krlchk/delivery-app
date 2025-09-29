import { Header } from "../shared";

export const HomePage = () => {
  return (
    <section className="flex h-screen flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <p className="text-2xl font-bold">Home page</p>
    </section>
  );
};
