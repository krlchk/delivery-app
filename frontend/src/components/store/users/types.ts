export interface IUser {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  passwordHash: string;
  role: "customer" | "admin" | "courier";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserState {
  user: IUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IRegisterResponse {
  user: IUser;
  status: number;
  message: string;
}

export interface ILoginResponse {
  data: ILoginResponseData;
  status: number;
  message: string;
}

export interface ILoginResponseData {
  token: string;
  user: IUser;
}
