import { IBase, Id } from "./common.types";

export interface IProduct extends IBase {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
}

export type CreateProductDto = Omit<
  IProduct,
  "id" | "created_at" | "updated_at"
>;

export type DeleteProductDto = {
  id: Id;
};

export type GetProductByIdDto = {
  id: Id;
};

export type GetProductByNameDto = {
  name: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;
