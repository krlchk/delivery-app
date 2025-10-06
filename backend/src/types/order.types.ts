import { IBase, Id } from "./common.types";
import { IProduct } from "./product.type";

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

export interface IOrderWithItems extends IOrder {
  items: IOrderItem[];
}

export interface IOrderItemPayload {
  product: IProduct;
  amount: number;
}

export type CreateOrderDto = {
  clientId: Id;
  deliveryAddress: string;
  items: IOrderItemPayload[];
};

export type UpdateOrderDto = {
  courierId?: Id | null;
  status?: "new" | "delivering" | "completed";
  deliveryAddress?: string;
};

export type GetOrderByIdDto = {
  id: Id;
};

export type DeleteOrderDto = {
  id: Id;
};
