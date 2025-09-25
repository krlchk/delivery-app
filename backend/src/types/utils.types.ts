import { IResponseBase, Id, Role } from "./common.types";
import { Request } from "express";

export interface IApiResponse<T> extends IResponseBase {
  data: T | null;
}

export interface IApiErrorResponse extends IResponseBase {
  error: string;
}

export interface ITokenPayload {
  id: Id;
  role: Role;
}
