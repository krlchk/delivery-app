import pool from "../config/db";
import { Id } from "../types/common.types";
import {
  CreateOrderDto,
  DeleteOrderDto,
  GetOrderByIdDto,
  IOrder,
  IOrderWithItems,
  UpdateOrderDto,
} from "../types/order.types";

export const createOrderService = async ({
  clientId,
  deliveryAddress,
  items,
}: CreateOrderDto): Promise<IOrder> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const orderResult = await client.query(
      "INSERT INTO orders (client_id, delivery_address, status) VALUES ($1, $2, 'new') RETURNING *",
      [clientId, deliveryAddress]
    );
    const newOrder = orderResult.rows[0];
    const itemQueries = items.map((item) => {
      return client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_per_item) VALUES ($1, $2, $3, $4)`,
        [newOrder.id, item.product.id, item.amount, item.product.price]
      );
    });
    await Promise.all(itemQueries);
    await client.query("COMMIT");
    return newOrder;
  } catch (error) {
    console.error(`Error creating order`, error);
    throw error;
  } finally {
    client.release();
  }
};

export const getOrderByIdService = async ({
  id,
}: GetOrderByIdDto): Promise<IOrderWithItems | null> => {
  try {
    const result = await pool.query(
      `SELECT
       o.id, o.status, o.delivery_address, o.created_at,
       json_agg(
         json_build_object(
           'productId', p.id,
           'name', p.name,
           'price', oi.price_per_item,
           'quantity', oi.quantity
         )
       ) FILTER (WHERE p.id IS NOT NULL) as items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     LEFT JOIN products p ON oi.product_id = p.id
     WHERE o.id = $1
     GROUP BY o.id`,
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching order with id ${id}`, error);
    throw error;
  }
};

export const deleteOrderService = async ({
  id,
}: DeleteOrderDto): Promise<IOrder | null> => {
  try {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error deleting order with id ${id}`, error);
    throw error;
  }
};

export const updateOrderService = async (
  id: Id,
  dto: UpdateOrderDto
): Promise<IOrder | null> => {
  try {
    if (Object.keys(dto).length === 0) {
      return getOrderByIdService({ id });
    }

    const fieldsToUpdate = { ...dto };

    const setClauses = Object.keys(fieldsToUpdate)
      .map((key, index) => {
        const dbKey =
          {
            clientId: "client_id",
            courierId: "courier_id",
            deliveryAddress: "delivery_address",
          }[key] || key;
        return `${dbKey} = $${index + 1}`;
      })
      .join(", ");

    const queryValues = Object.values(fieldsToUpdate);

    const queryString = `
  UPDATE orders SET ${setClauses} WHERE id = $${
      queryValues.length + 1
    } RETURNING *`;
    const result = await pool.query(queryString, [...queryValues, id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error(`Error updating order with id ${id}`, error);
    throw error;
  }
};

export const getAllOrdersService = async (): Promise<IOrderWithItems[]> => {
  try {
    const result = await pool.query(
      `SELECT
       o.id, o.status, o.delivery_address, o.created_at,
       json_agg(
         json_build_object(
           'productId', p.id,
           'name', p.name,
           'price', oi.price_per_item,
           'quantity', oi.quantity
         )
       ) FILTER (WHERE p.id IS NOT NULL) as items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     LEFT JOIN products p ON oi.product_id = p.id
     GROUP BY o.id`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching all orders", error);
    throw error;
  }
};

export const getOrdersByClientIdService = async (
  clientId: Id
): Promise<IOrderWithItems[]> => {
  try {
    const result = await pool.query(
      `SELECT
         o.id, o.status, o.delivery_address, o.created_at,
         json_agg(
           json_build_object(
             'productId', p.id, 'name', p.name,
             'price', oi.price_per_item, 'quantity', oi.quantity
           )
         ) FILTER (WHERE p.id IS NOT NULL) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.client_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [clientId]
    );
    return result.rows;
  } catch (error) {
    console.error(`Error fetching orders for client id ${clientId}`, error);
    throw error;
  }
};
