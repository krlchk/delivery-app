import type { IBase } from "./common.types";

export interface IProductState {
  products: IProduct[];
  orderedProducts: IOrderProduct[];
}

export interface IProduct extends IBase {
  image: string;
  name: string;
  price: number;
  description: string;
}

export interface IOrderProduct {
  amount: number;
  product: IProduct;
  showToast: (msg: string) => void;
}

export interface OrderSummaryProps {
  orderedProducts: IOrderProduct[];
  totalCost: number;
  showToast: (msg: string) => void;
}
