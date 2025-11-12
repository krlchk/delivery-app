import { useState } from "react";
import { InputField } from "../shared";
import { useAppDispatch } from "../app/hooks";
import { createProduct } from "../components/store/product/productsAsyncThunks";
import type { ModalWindowProps } from "../shared/types";
import { useNavigate } from "react-router-dom";

export const ModalCreateProduct = ({ handleClick }: ModalWindowProps) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [img, setImg] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      const parsedPrice = parseFloat(price);
      const parsedQuantity = parseInt(stockQuantity);

      if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
        setSubmitError("Price and quantity must be valid numbers.");
        return;
      }
      const newProduct = {
        name: name,
        description: desc,
        price: parsedPrice,
        stockQuantity: parsedQuantity,
        img: img,
      };
      await dispatch(createProduct(newProduct)).unwrap();
      handleClick();
      navigate("/catalog-page");
    } catch (err: unknown) {
      const error = err as { message: string };
      if (error?.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <section>
      <h2 className="text-center">Create product</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => handleCreateProduct(e)}
      >
        <InputField
          id="name"
          label="Name"
          onValueChange={setName}
          placeholder="name..."
          type="text"
          required
        />
        <InputField
          id="description"
          label="Description"
          onValueChange={setDesc}
          placeholder="description..."
          type="text"
          required
        />
        <InputField
          id="price"
          label="Price"
          onValueChange={setPrice}
          placeholder="price..."
          type="number"
          required
        />
        <InputField
          id="quantity"
          label="Quantity"
          onValueChange={setStockQuantity}
          placeholder="quantity..."
          type="number"
          required
        />
        <InputField
          id="img"
          label="Img url"
          onValueChange={setImg}
          placeholder="img url..."
          type="text"
          required
        />
        {submitError && (
          <p role="alert" className="text-center font-bold text-red-500">
            {submitError}
          </p>
        )}
        <button
          className="w-full rounded-md border bg-green-800 p-1 text-white transition-colors hover:bg-green-900"
          type="submit"
        >
          Create
        </button>
      </form>
    </section>
  );
};
