import { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

import { AppError } from "./errors/AppError";
import { authConfig } from "../config/auth";
import { HTTP_STATUS_CODES } from "./constants/httpStatusCodes";
import { logger } from "./logger";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function isAuthenticated(
  request: VercelRequest,
  response: VercelResponse
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "JWT token is required");
  }

  const [_, token] = authHeader.split(" ");

  try {
    const decodedToken = jwt.verify(token, String(authConfig.jwt.secret));
    // const { sub } = decodedToken as ITokenPayload;

    // request.user = {
    //   id: sub,
    // };
  } catch (error: any) {
    logger.error(error);
    throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "JWT token is invalid");
  }
}
