import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addProductToCart } from "../components/store/product/product-slice";
import {
  MAX_PRODUCT_AMOUNT,
  MIN_PRODUCT_AMOUNT,
} from "../components/utils/CONSTANTS";
import type { CatalogUnitProps } from "./shared.types";

export const CatalogUnit = ({ product, showToast }: CatalogUnitProps) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(MIN_PRODUCT_AMOUNT);
  const { id, img, name, price, description } = product;
  const handleAddProduct = () => {
    dispatch(
      addProductToCart({
        amount: amount,
        product: product,
      }),
    );
    showToast("Product added to order");
    setAmount(MIN_PRODUCT_AMOUNT);
  };
  const handleReduce = () => {
    if (amount > MIN_PRODUCT_AMOUNT) setAmount((prevAmount) => prevAmount - 1);
  };
  const handleAdd = () => {
    if (amount < MAX_PRODUCT_AMOUNT) setAmount((prevAmount) => prevAmount + 1);
  };
  return (
    <article
      key={id}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-400"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-white">
        <img className="h-60 w-60 object-contain" src={img} alt={name} />
      </div>
      <section className="flex flex-col p-3 text-lg font-medium">
        <h2 className="text-center text-xl font-semibold">{name}</h2>
        <p className="mt-5">
          Price: <span className="font-bold text-green-800">{price}$</span>
        </p>
        <p className="h-28 flex-grow overflow-hidden">
          Description: <span className="font-normal">{description}</span>
        </p>
        <div className="mt-auto flex items-center justify-center gap-5 text-neutral-500">
          <button
            onClick={handleReduce}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 text-lg font-semibold transition-colors hover:bg-neutral-300"
          >
            -
          </button>
          <p className="text-xl">{amount}</p>
          <button
            onClick={handleAdd}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 text-lg font-semibold transition-colors hover:bg-neutral-300"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-5 w-full rounded-lg bg-stone-300 py-2 font-semibold transition-colors hover:bg-stone-400"
        >
          add to order
        </button>
      </section>
    </article>
  );
};
