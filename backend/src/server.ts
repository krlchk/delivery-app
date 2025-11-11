import express, { Request, Response } from "express";
import pool from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user-route";
import productRoutes from "./routes/product-route";
import orderRoutes from "./routes/order-routes";
import cancellationRoutes from "./routes/cancellation-routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", cancellationRoutes);

app.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT current_database()");
    console.log("Database name:", result.rows[0].current_database);
    res.send(`The current database name is ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Error quering database", error);
    res.status(500).send("Error retrieving database name");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
