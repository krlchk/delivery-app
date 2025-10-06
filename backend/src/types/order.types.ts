import { IBase, Id } from "./common.types";

export interface IOrder extends IBase {
  clientId: Id;
  courierId?: Id | null;
  status: "new" | "delivering" | "completed";
  deliveryAddress: string;
}

export type CreateOrderDto = Omit<
  IOrder,
  "id" | "created_at" | "updated_at" | "status"
> & { items: IOrderItem[] };

export type GetOrderByIdDto = {
  id: Id;
};

export type DeleteOrderDto = {
  id: Id;
};

export type UpdateOrderDto = Partial<CreateOrderDto> & {
  status?: "new" | "delivering" | "completed";
};

export interface IOrderWithItems extends IOrder {
  items: IOrderItem[];
}

export interface IOrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}
