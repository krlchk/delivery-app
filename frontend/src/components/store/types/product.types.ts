import type { IBase, IResponseBase } from "./common.types";

export interface IProductState {
  products: IProduct[];
  orderedProducts: IOrderProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IProduct extends IBase {
  img: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
}

export interface IOrderProduct {
  amount: number;
  product: IProduct;
  showToast?: (msg: string) => void | null;
}

export interface OrderSummaryProps {
  orderedProducts: IOrderProduct[];
  totalCost: number;
  showToast: (msg: string) => void;
}

export interface IProductResponse extends IResponseBase {
  data: IProduct[];
}
