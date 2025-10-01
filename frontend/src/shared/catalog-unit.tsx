import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import type { IProduct } from "../components/store/types/product.types";
import { addProductToCart } from "../components/store/product/product-slice";
import {
  MAX_PRODUCT_AMOUNT,
  MIN_PRODUCT_AMOUNT,
} from "../components/utils/CONSTANTS";

export const CatalogUnit = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(MIN_PRODUCT_AMOUNT);
  const { id, image, name, price, description } = product;
  const handleAddProduct = () => {
    dispatch(
      addProductToCart({
        amount: amount,
        product: {
          id: id,
          image: image,
          name: name,
          price: price,
          description: description,
        },
      }),
    );
    setAmount(MIN_PRODUCT_AMOUNT);
  };
  const handleReduce = () => {
    if (amount > MIN_PRODUCT_AMOUNT) setAmount((prevAmount) => prevAmount - 1);
  };
  const handleAdd = () => {
    if (amount < MAX_PRODUCT_AMOUNT) setAmount((prevAmount) => prevAmount + 1);
  };
  return (
    <article key={id} className="rounded-lg border border-neutral-400">
      <img
        className="w-full rounded-tl-lg rounded-tr-lg"
        src={image}
        alt={name}
      />
      <section className="p-3 text-lg font-medium">
        <h2 className="text-center text-xl font-semibold">{name}</h2>
        <p>
          Price: <span className="font-bold text-green-800">{price}$</span>
        </p>
        <p>
          Description: <span className="font-normal">{description}</span>
        </p>
        <div className="flex items-center justify-center gap-5 text-neutral-500">
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
