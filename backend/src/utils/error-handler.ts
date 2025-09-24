import { Response } from "express";

export const errorHandler = (err: unknown, res: Response): void => {
  const status = 500;
  const message =
    err instanceof Error ? err.message : "Something went wrong - ERRORHANDLER";
  res.status(status).json({
    status: status,
    message: message,
    error: message,
  });
};
