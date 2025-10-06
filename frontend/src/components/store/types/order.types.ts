import type { IBase, IBaseState, Id, IResponseBase } from "./common.types";
import type { IProduct } from "./product.types";

export interface IOrder extends IBase {
  clientId: Id;
  courierId?: Id | null;
  status: "new" | "delivering" | "completed";
  deliveryAddress: string;
}

export interface IOrderState extends IBaseState {
  orders: IOrder[];
}

export interface IOrderResponse extends IResponseBase {
  data: IOrder;
}

export interface IOrderItemPayload {
  product: IProduct;
  amount: number;
}