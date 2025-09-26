import type { IBase, IResponseBase, Role } from "./common.types";

export interface IUser extends IBase {
  full_name: string;
  phone_number: string;
  email: string;
  password_hash: string;
  role: Role;
}

export interface IUserState {
  user: IUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IRegisterResponse extends IResponseBase {
  user: IUser;
}

export interface ILoginResponse extends IResponseBase {
  data: ILoginResponseData;
}

export interface ILoginResponseData {
  token: string;
  user: IUser;
}
