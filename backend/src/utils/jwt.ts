import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET! as string;
  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    "1h") as SignOptions["expiresIn"];
    
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};
