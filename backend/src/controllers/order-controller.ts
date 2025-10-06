import { Request, Response } from "express";
import { errorHandler, responseHandler } from "../utils";
import {
  createOrderService,
  deleteOrderService,
  getAllOrdersService,
  getOrderByIdService,
  getOrdersByClientIdService,
  updateOrderService,
} from "../models/order-model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { deliveryAddress, items } = req.body;
    const clientId = req.user?.id;
    if (!clientId) {
      return responseHandler(res, 401, "User is not authenticated");
    }

    const order = await createOrderService({
      clientId,
      deliveryAddress,
      items,
    });
    return responseHandler(res, 201, "Order created succesfully", order);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responseHandler(res, 400, "Invalid order Id");
    }
    const order = await getOrderByIdService({ id });
    if (!order) {
      return responseHandler(res, 404, "Order not found");
    }
    const requester = req.user;
    if (!requester) {
      return responseHandler(res, 401, "User not authenticated");
    }
    if (requester.role !== "admin" && requester.id !== order.clientId) {
      return responseHandler(
        res,
        403,
        "Forbidden: You can only view your own orders."
      );
    }
    return responseHandler(res, 200, "Order fetched succesfully", order);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responseHandler(res, 400, "Invalid order id");
    }
    const deletedOrder = await deleteOrderService({ id });
    if (!deletedOrder) {
      return responseHandler(res, 404, "Order not found");
    }
    return responseHandler(res, 200, "Order deleted succesfully", deletedOrder);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const idToUpdate = parseInt(req.params.id);
    if (isNaN(idToUpdate)) {
      return responseHandler(res, 400, "Invalid order Id");
    }

    const requester = req.user;
    if (!requester || requester.role !== "admin") {
      return responseHandler(
        res,
        403,
        "Forbidden: Access denied. Admins only."
      );
    }
    const fieldsToUpdate = req.body;

    const updatedOrder = await updateOrderService(idToUpdate, fieldsToUpdate);

    if (!updatedOrder) {
      return responseHandler(res, 404, "Order not found");
    }

    return responseHandler(
      res,
      200,
      "Order updated successfully",
      updatedOrder
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrdersService();
    const requester = req.user;
    if (!requester) {
      return responseHandler(res, 401, "User not authenticated");
    }
    if (requester.role !== "admin") {
      return responseHandler(
        res,
        403,
        "Forbidden: Access denied. Admins only."
      );
    }
    return responseHandler(res, 200, "Orders fetched succesfully", orders);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const clientId = req.user?.id;
    if (!clientId) {
      return responseHandler(res, 401, "User not authenticated");
    }

    const orders = await getOrdersByClientIdService(clientId);
    
    return responseHandler(res, 200, "User's orders fetched successfully", orders);
  } catch (error) {
    return errorHandler(error, res);
  }
};
