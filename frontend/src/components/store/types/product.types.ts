import type { IBase, IBaseState, IResponseBase } from "./common.types";

export interface IProductState extends IBaseState {
  products: IProduct[];
  orderedProducts: IOrderProduct[];
}

export interface IProduct extends IBase {
  img: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
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
