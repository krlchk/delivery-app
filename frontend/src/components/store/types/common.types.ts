export type Id = number;
export type Role = "customer" | "admin" | "courier";

export interface IBase {
  id: Id;
  created_at?: Date;
  updated_at?: Date;
}

export interface IResponseBase {
  status: number;
  message: string;
}
