import { Request, Response } from "express";
import { responseHandler, errorHandler } from "../utils";
import { getOrdersByStatusService, getPopularProductsService } from "../models/analytics-model";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const [ordersByStatus, popularProducts] = await Promise.all([
      getOrdersByStatusService(),
      getPopularProductsService()
    ]);

    return responseHandler(res, 200, "Analytics fetched", {
      ordersByStatus,
      popularProducts
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};