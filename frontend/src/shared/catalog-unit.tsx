import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import type { IProduct } from "../components/store/types/product.types";
import { addProductToCart } from "../components/store/product/product-slice";

export const CatalogUnit = ({
  id,
  image,
  name,
  price,
  description,
}: IProduct) => {
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(1);

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
    setAmount(1);
  };
  return (
    <div key={id} className="rounded-lg border border-neutral-400">
      <img
        className="w-full rounded-tl-lg rounded-tr-lg"
        src={image}
        alt="product image"
      />
      <div className="p-3">
        <p className="text-center text-xl font-semibold">{name}</p>
        <p className="text-lg font-medium">
          Price: <span className="font-bold text-red-800">{price}$</span>
        </p>
        <p className="text-lg font-medium">
          Description:{" "}
          <span className="text-lg font-normal">{description}</span>
        </p>
        <div className="flex items-center justify-center gap-5 text-neutral-500">
          <button
            onClick={() => {
              if (amount >= 2) setAmount((prevAmount) => prevAmount - 1);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 text-lg font-semibold transition-colors hover:bg-neutral-300"
          >
            -
          </button>
          <p className="text-xl">{amount}</p>
          <button
            onClick={() => {
              if (amount < 10) setAmount((prevAmount) => prevAmount + 1);
            }}
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
      </div>
    </div>
  );
};
