import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  getProductByNameService,
  updateProductService,
} from "../models";
import { errorHandler, responseHandler } from "../utils";
import { UpdateProductDto } from "../types/product.type";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock_quantity } = req.body;
    const existingProduct = await getProductByNameService({ name });

    if (existingProduct) {
      return responseHandler(
        res,
        409,
        "The product with this name already exists",
        existingProduct
      );
    }

    const product = await createProductService({
      name,
      description,
      price,
      stock_quantity,
    });
    return responseHandler(res, 201, "Product created succesfully", product);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return responseHandler(res, 200, "Products fetched succesfully", products);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responseHandler(res, 400, "Invalid product ID");
    }
    const product = await getProductByIdService({ id });
    if (!product) {
      return responseHandler(res, 404, "Product not found");
    }
    return responseHandler(res, 200, "Product fetched succesfully", product);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responseHandler(res, 400, "Invalid product ID");
    }
    const deletedProduct = await deleteProductService({ id });
    if (!deletedProduct) {
      return responseHandler(res, 404, "Product not found");
    }
    return responseHandler(
      res,
      200,
      "Product deleted succesfully",
      deletedProduct
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const idToUpdate = parseInt(req.params.id);
    if (isNaN(idToUpdate)) {
      return responseHandler(res, 400, "Invalid product ID");
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

    const updatedProduct = await updateProductService(
      idToUpdate,
      fieldsToUpdate
    );

    if (!updatedProduct) {
      return responseHandler(res, 404, "Product not found");
    }

    return responseHandler(
      res,
      200,
      "Product updated successfully",
      updatedProduct
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};
