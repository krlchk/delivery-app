import { Request, Response, NextFunction } from "express";
import { responseHandler } from "../utils";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types/utils.types";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return responseHandler(res, 401, "Access denied. No token provided");
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return responseHandler(
        res,
        500,
        "Server configuration error: JWT secret is missing"
      );
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded as ITokenPayload;
    next();
  } catch (error) {
    return responseHandler(res, 403, "Invalid or expired token");
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return responseHandler(res, 403, "Forbidden: Admin access required");
  }
};
