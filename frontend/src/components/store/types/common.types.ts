export type Id = number;
export type Role = "customer" | "admin" | "courier";

export interface IBase {
  id: Id;
  created_at?: Date;
  updated_at?: Date;
}

export interface IBaseState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IResponseBase {
  status: number;
  message: string;
}
