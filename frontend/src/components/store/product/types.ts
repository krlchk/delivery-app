export interface IProductState {
  products: IProduct[];
  orderedProducts: IOrderProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IProduct {
  id: number;
  img: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  createdAt?: Date;
  updatedAt?: Date;
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

export interface IProductResponse {
  data: IProduct[];
  status: number;
  message: string;
}
