import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { deleteProduct } from "../components/store/product/productsAsyncThunks";
import type { ModalWindowProps } from "../shared/types";
import { removeAllProductsFromCart } from "../components/store/product/productSlice";

export const ModalDeleteProduct = ({ handleClick }: ModalWindowProps) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = async (productId: number) => {
    try {
      await dispatch(deleteProduct({ id: productId })).unwrap();
      dispatch(removeAllProductsFromCart());
      navigate("/catalog-page");
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };
  return (
    <section className="text-center">
      <h2>Are you shure you want to delete?</h2>
      <div className="mt-5 flex">
        <button
          onClick={() => {
            if (id) handleDelete(parseInt(id));
          }}
          className="mt-2 w-full rounded-md border bg-red-800 p-1 text-white transition-colors hover:bg-red-900"
        >
          Delete
        </button>
        <button
          onClick={handleClick}
          className="mt-2 w-full rounded-md border bg-green-800 p-1 text-white transition-colors hover:bg-green-900"
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

