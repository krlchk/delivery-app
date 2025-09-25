import { ITokenPayload } from "../utils.types";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
    }
  }
}
