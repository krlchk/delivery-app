import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div>Home page</div>
      <button
        onClick={() => navigate("/catalog-page")}
        className="w-full rounded-lg bg-neutral-300 px-4 py-1 font-semibold transition-colors hover:bg-neutral-400"
      >
        To Catalog
      </button>
    </section>
  );
};
