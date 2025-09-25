import { Response } from "express";
import { IApiErrorResponse } from "../types/utils.types";

export const errorHandler = (err: unknown, res: Response): void => {
  const status = 500;
  const message =
    err instanceof Error ? err.message : "Something went wrong - ERRORHANDLER";
  const responseBody: IApiErrorResponse = {
    status: status,
    message: message,
    error: message,
  };
  res.status(status).json(responseBody);
};
