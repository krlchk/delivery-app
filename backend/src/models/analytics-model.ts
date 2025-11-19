import pool from "../config/db";
import camelcaseKeys from "camelcase-keys";

export const getOrdersByStatusService = async () => {
  const result = await pool.query(`
    SELECT status, COUNT(*) as count 
    FROM orders 
    GROUP BY status
  `);
  return camelcaseKeys(result.rows);
};

export const getPopularProductsService = async () => {
  const result = await pool.query(`
    SELECT p.name, SUM(oi.quantity) as total_sold
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    GROUP BY p.name
    ORDER BY total_sold DESC
    LIMIT 5
  `);
  return camelcaseKeys(result.rows);
};