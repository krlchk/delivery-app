import camelcaseKeys from "camelcase-keys";
import pool from "../config/db";
import {
  CreateCancellationDto,
  ICancellation,
} from "../types/cancellation.types";

export const createCancellationService = async ({
  orderId,
  reason,
}: CreateCancellationDto): Promise<ICancellation> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertResult = await client.query(
      "INSERT INTO cancellations (order_id, reason) VALUES ($1, $2) RETURNING *",
      [orderId, reason]
    );
    await client.query("UPDATE orders SET status = 'cancelled' WHERE id = $1", [
      orderId,
    ]);
    await client.query("COMMIT");

    return camelcaseKeys(insertResult.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(`Error in createCancellationService transaction`, error);
    throw error;
  } finally {
    client.release();
  }
};
