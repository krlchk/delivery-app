import { useAppDispatch } from "../app/hooks";
import {
  removeProductFromCart,
  setNewAmount,
} from "../components/store/product/product-slice";
import type { IOrderProduct } from "../components/store/types/product.types";
import {
  MAX_PRODUCT_AMOUNT,
  MIN_PRODUCT_AMOUNT,
} from "../components/utils/CONSTANTS";

export const OrderUnit = ({ product, amount, showToast }: IOrderProduct) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = () => {
    dispatch(
      removeProductFromCart({
        id: product.id,
      }),
    );
    showToast("Product removed from order")
  };

  const handleReduce = () => {
    if (amount === MIN_PRODUCT_AMOUNT) {
      handleRemoveFromCart();
      showToast("Product removed from order")
    } else {
      dispatch(
        setNewAmount({
          id: product.id,
          amount: amount - 1,
        }),
      );
    }
  };
  const handleAdd = () => {
    if (amount < MAX_PRODUCT_AMOUNT)
      dispatch(
        setNewAmount({
          id: product.id,
          amount: amount + 1,
        }),
      );
  };

  return (
    <article key={product.id} className="rounded-lg border border-neutral-400">
      <img
        className="w-full rounded-tl-lg rounded-tr-lg"
        src={product.image}
        alt="product image"
      />
      <section className="p-3">
        <p className="text-center text-xl font-semibold">{product.name}</p>
        <p className="text-lg font-medium">
          Price for one:{" "}
          <span className="font-bold text-neutral-700">{product.price}$</span>
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
            onClick={handleReduce}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 text-lg font-semibold transition-colors hover:bg-neutral-300"
          >
            -
          </button>
          <p
            className={`text-xl ${amount === 1 ? "text-red-800" : ""} ${amount === 10 ? "text-green-800" : ""}`}
          >
            {amount}
          </p>
          <button
            onClick={handleAdd}
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
      </section>
    </article>
  );
};
