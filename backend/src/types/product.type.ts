import { IBase, Id } from "./common.types";

export interface IProduct extends IBase {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
};

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
