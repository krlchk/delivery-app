export type Id = number;
export type Role = "customer" | "admin" | "courier";

export interface IBase {
  id: Id;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResponseBase {
  status: number;
  message: string;
}
