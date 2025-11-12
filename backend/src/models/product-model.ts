import camelcaseKeys from "camelcase-keys";
import pool from "../config/db";
import { Id } from "../types/common.types";
import {
  CreateProductDto,
  DeleteProductDto,
  GetProductByIdDto,
  GetProductByNameDto,
  IProduct,
  UpdateProductDto,
} from "../types/product.type";

export const createProductService = async ({
  name,
  description,
  price,
  stockQuantity,
  img,
}: CreateProductDto): Promise<IProduct> => {
  try {
    const result = await pool.query(
      "INSERT INTO products (name, description, price, stock_quantity, img) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, price, stockQuantity, img]
    );
    return camelcaseKeys(result.rows[0]);
  } catch (error) {
    console.error(`Error creating product`, error);
    throw error;
  }
};

export const deleteProductService = async ({
  id,
}: DeleteProductDto): Promise<IProduct | null> => {
  try {
    const result = await pool.query(
      "UPDATE products SET deleted_at = NOW() WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return camelcaseKeys(result.rows[0]);
  } catch (error) {
    console.error(`Error deleting product with id ${id}`, error);
    throw error;
  }
};

export const updateProductService = async (
  id: Id,
  dto: UpdateProductDto
): Promise<IProduct | null> => {
  try {
    if (Object.keys(dto).length === 0) {
      return getProductByIdService({ id });
    }

    const fieldsToUpdate = { ...dto };

    const setClauses = Object.keys(fieldsToUpdate)
      .map((key, index) => {
        const dbKey =
          {
            stockQuantity: "stock_quantity",
            createdAt: "created_at",
            updatedAt: "updated_at",
          }[key] || key;

        return `${dbKey} = $${index + 1}`;
      })
      .join(", ");

    const queryValues = Object.values(fieldsToUpdate);

    const queryString = `
  UPDATE products SET ${setClauses} WHERE id = $${
      queryValues.length + 1
    } AND deleted_at IS NULL RETURNING *`;
    const result = await pool.query(queryString, [...queryValues, id]);

    if (result.rows.length === 0) {
      return null;
    }

    return camelcaseKeys(result.rows[0]);
  } catch (error) {
    console.error(`Error updating product with id ${id}`, error);
    throw error;
  }
};

export const getProductByIdService = async ({
  id,
}: GetProductByIdDto): Promise<IProduct | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return camelcaseKeys(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching product with id ${id}`, error);
    throw error;
  }
};

export const getAllProductsService = async (): Promise<IProduct[]> => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE deleted_at IS NULL"
    );
    return camelcaseKeys(result.rows);
  } catch (error) {
    console.error("Error fetching all products", error);
    throw error;
  }
};

export const getProductByNameService = async ({
  name,
}: GetProductByNameDto): Promise<IProduct | null> => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE name = $1 AND deleted_at IS NULL",
      [name]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return camelcaseKeys(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching product with name ${name}`, error);
    throw error;
  }
};
