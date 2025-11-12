import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import {
  fetchProductById,
  updateProduct,
} from "../components/store/product/productsAsyncThunks";
import { Header, InputField, ModalWindow } from "../shared";
import { ModalDeleteProduct } from "../modal/ModalDeleteProduct";
import { removeAllProductsFromCart } from "../components/store/product/productSlice";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { currentProduct } = useAppSelector((state) => state.delivery.products);
  const { status, error } = useAppSelector((state) => state.delivery.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [img, setImg] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setDesc(currentProduct.description);
      setPrice(String(currentProduct.price));
      setStockQuantity(String(currentProduct.stockQuantity));
      setImg(currentProduct.img);
    }
  }, [currentProduct]);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!id) return;

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(stockQuantity);

    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      setSubmitError("Price and quantity must be valid numbers.");
      return;
    }

    try {
      const updatedProduct = {
        id: parseInt(id),
        name: name,
        description: desc,
        price: parsedPrice,
        stockQuantity: parsedQuantity,
        img: img,
      };
      await dispatch(updateProduct(updatedProduct)).unwrap();
      dispatch(removeAllProductsFromCart());
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

  if (status === "loading" || status === "idle") {
    return (
      <main>
        <h1>Loading product...</h1>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main>
        <h1>Error: {error}</h1>
      </main>
    );
  }

  if (!currentProduct) {
    return (
      <main>
        <h1>Product not found.</h1>
      </main>
    );
  }

  const handleClickDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  return (
    <main className="flex h-full flex-col items-center bg-neutral-200 p-10 text-xl font-semibold text-neutral-700">
      <Header />
      <div className="flex w-full justify-center gap-10">
        <article
          key={currentProduct.id}
          className="flex w-1/3 flex-col overflow-hidden rounded-lg border border-neutral-400"
        >
          <div className="flex aspect-[4/3] items-center justify-center bg-white">
            <img
              className="h-60 w-60 object-contain"
              src={currentProduct.img}
              alt={currentProduct.name}
            />
          </div>
          <section className="flex flex-col p-3 text-lg font-medium">
            <h2 className="text-center text-xl font-semibold">
              {currentProduct.name}
            </h2>
            <p className="mt-5">
              Price for one:{" "}
              <span className="font-bold text-neutral-700">
                {currentProduct.price}$
              </span>
            </p>
            <p className="mt-5">
              Stock quantity:{" "}
              <span className="font-bold text-neutral-700">
                {currentProduct.stockQuantity}
              </span>
            </p>
            <p className="mt-5 h-28 flex-grow overflow-hidden">
              Description:{" "}
              <span className="font-normal">{currentProduct.description}</span>
            </p>
          </section>
        </article>
        <section className="w-1/2">
          <h2 className="text-center">Update product</h2>
          <form className="flex flex-col gap-3" onSubmit={handleUpdateProduct}>
            <InputField
              value={name}
              id="name"
              label="Name"
              onValueChange={setName}
              placeholder="name..."
              type="text"
              required
            />
            <InputField
              value={price}
              id="price"
              label="Price"
              onValueChange={setPrice}
              placeholder="price..."
              type="number"
              required
            />
            <InputField
              value={stockQuantity}
              id="quantity"
              label="Quantity"
              onValueChange={setStockQuantity}
              placeholder="quantity..."
              type="number"
              required
            />
            <InputField
              value={desc}
              id="description"
              label="Description"
              onValueChange={setDesc}
              placeholder="description..."
              type="text"
              required
            />
            <InputField
              value={img}
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
              Update
            </button>
          </form>
          <button
            onClick={handleClickDeleteModal}
            className="mt-2 w-full rounded-md border bg-red-800 p-1 text-white transition-colors hover:bg-red-900"
            type="submit"
          >
            Delete product
          </button>
        </section>
      </div>
      <ModalWindow
        isOpen={isOpenDeleteModal}
        handleClick={handleClickDeleteModal}
        child={<ModalDeleteProduct handleClick={handleClickDeleteModal} />}
      />
    </main>
  );
};
