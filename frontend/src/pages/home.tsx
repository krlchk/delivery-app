import { Header } from "../shared";

export const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-neutral-700">
      <Header />
      <h1 className="text-2xl font-bold">Home page</h1>
    </main>
  );
};
