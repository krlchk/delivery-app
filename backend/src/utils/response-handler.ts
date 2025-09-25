import { Response } from "express";
import { IApiResponse } from "../types/utils.types";

export const responseHandler = <T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null
): void => {
  const responseBody: IApiResponse<T> = {
    status,
    message,
    data,
  };
  res.status(status).json(responseBody);
};
