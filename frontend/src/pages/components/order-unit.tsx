import { useAppDispatch } from "../../app/hooks";
import {
  removeProductFromCart,
  setNewAmount,
} from "../../components/store/product/product-slice";
import type { IOrderProduct } from "../../components/store/types/product.types";

export const OrderUnit = ({ product, amount }: IOrderProduct) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    dispatch(
      removeProductFromCart({
        id: product.id,
      }),
    );
  };

  return (
    <div key={product.id} className="rounded-lg border border-neutral-400">
      <img
        className="w-full rounded-tl-lg rounded-tr-lg"
        src={product.image}
        alt="product image"
      />
      <div className="p-3">
        <p className="text-center text-xl font-semibold">{product.name}</p>
        <p className="text-lg font-medium">
          Price for one:{" "}
          <span className="font-bold text-red-800">{product.price}$</span>
        </p>
        <p className="text-lg font-medium">
          Total price:{" "}
          <span className="font-bold text-green-800">
            {product.price * amount}$
          </span>
        </p>
        <p className="text-lg font-medium">
          Description:{" "}
          <span className="text-lg font-normal">{product.description}</span>
        </p>
        <div className="flex items-center justify-center gap-5 text-neutral-500">
          <button
            onClick={() => {
              if (amount === 1) {
                handleRemoveFromCart();
              } else {
                dispatch(
                  setNewAmount({
                    id: product.id,
                    amount: amount - 1,
                  }),
                );
              }
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 text-lg font-semibold transition-colors hover:bg-neutral-300"
          >
            -
          </button>
          <p
            className={`text-xl ${amount === 1 ? "text-red-500" : ""} ${amount === 10 ? "text-green-500" : ""}`}
          >
            {amount}
          </p>
          <button
            onClick={() => {
              if (amount < 10)
                dispatch(
                  setNewAmount({
                    id: product.id,
                    amount: amount + 1,
                  }),
                );
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 text-lg font-semibold transition-colors hover:bg-neutral-300"
          >
            +
          </button>
        </div>
        <button
          onClick={handleRemoveFromCart}
          className="mt-5 w-full rounded-lg bg-stone-300 py-2 font-semibold transition-colors hover:bg-stone-400"
        >
          remove from order
        </button>
      </div>
    </div>
  );
};
