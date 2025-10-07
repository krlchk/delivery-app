import type { IBase, IBaseState, Id, IResponseBase } from "./common.types";
import type { IProduct } from "./product.types";

export interface IOrder extends IBase {
  clientId: Id;
  courierId?: Id | null;
  status: "new" | "delivering" | "completed";
  deliveryAddress: string;
}

export interface IOrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderWithItems {
  id: Id;
  status: "new" | "delivering" | "completed";
  deliveryAddress: string;
  createdAt: Date;
  items: IOrderItem[];
}

export interface IOrderState extends IBaseState {
  orders: IOrder[];
  myOrders: IOrderWithItems[];
}

export interface IOrderResponse extends IResponseBase {
  data: IOrder;
}
export interface IOrdersResponse extends IResponseBase {
  data: IOrderWithItems[];
}

export interface IOrderItemPayload {
  product: IProduct;
  amount: number;
}
