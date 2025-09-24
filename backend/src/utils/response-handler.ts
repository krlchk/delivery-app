import { Response } from "express";

export const responseHandler = <T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null
): void => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
