import type { IProduct } from "../product/types";

export interface IOrder {
  id: number;
  clientId: number;
  courierId?: number | null;
  status: "new" | "delivering" | "completed" | "cancelled";
  deliveryAddress: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrderWithItems {
  id: number;
  status: "new" | "delivering" | "completed" | "cancelled";
  deliveryAddress: string;
  createdAt: Date;
  items: IOrderItem[];
}

export interface IOrderState {
  orders: IOrder[];
  myOrders: IOrderWithItems[];
  currentOrder: IOrderWithItems | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IOrderResponse {
  data: IOrder;
  status: number;
  message: string;
}

export interface IOrdersResponse {
  data: IOrderWithItems[];
  status: number;
  message: string;
}

export interface IOrderByIdResponse {
  data: IOrderWithItems;
  status: number;
  message: string;
}

export interface IOrderItemPayload {
  product: IProduct;
  amount: number;
}
