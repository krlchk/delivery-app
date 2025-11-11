import { Request, Response } from "express";
import { createCancellationService } from "../models/cancellation-model";
import { errorHandler, responseHandler } from "../utils";

export const createCancellation = async (req: Request, res: Response) => {
  try {
    const { orderId, reason } = req.body;

    const cancellation = await createCancellationService({
      orderId,
      reason,
    });
    return responseHandler(
      res,
      201,
      "Cancellation successful and order updated",
      cancellation
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};
