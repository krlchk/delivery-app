import type { IBase, IBaseState, IResponseBase, Role } from "./common.types";

export interface IUser extends IBase {
  full_name: string;
  phone_number: string;
  email: string;
  password_hash: string;
  role: Role;
}

export interface IUserState  extends IBaseState {
  user: IUser | null;
  token: string | null;
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
