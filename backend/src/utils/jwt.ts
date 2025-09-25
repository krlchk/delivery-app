import jwt, { SignOptions } from "jsonwebtoken";
import { ITokenPayload } from "../types/utils.types";

export const generateToken = (payload: ITokenPayload): string => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
    throw new Error("JWT secret key is missing, server cannot start.");
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    "1h") as SignOptions["expiresIn"];
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};
