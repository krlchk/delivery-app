export interface IProductState {
  currentProduct: IProduct | null;
  products: IProduct[];
  orderedProducts: IOrderProduct[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  img: string;
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
export interface IProductCreateResponse {
  data: IProduct;
  status: number;
  message: string;
}
export interface IProductByIdResponse {
  data: IProduct;
  status: number;
  message: string;
}
export  interface IDeleteProductResponse {
  data: IProduct;
  status: number;
  message: string;
}
export  interface IUpdateProductResponse {
  data: IProduct;
  status: number;
  message: string;
}
