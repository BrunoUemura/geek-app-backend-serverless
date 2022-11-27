import {
  VercelRequest,
  VercelRequestQuery,
  VercelResponse,
} from "@vercel/node";

import { database } from "../../../infra/db/prisma/connection";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleError } from "../../../shared/errors/handleError";
import { handleResponse } from "../../../shared/handleResponse";
import { UserRepository } from "../repositories";
import FindUserByIdService from "../services/FindUserByIdService";

export default function (request: VercelRequest, response: VercelResponse) {
  const userRepository = UserRepository();
  const findUserByIdService = FindUserByIdService(userRepository);

  async function findById(
    requestQuery: VercelRequestQuery
  ): Promise<VercelResponse> {
    const { id } = requestQuery;

    try {
      const user = await findUserByIdService.execute(String(id));
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function handle() {
    if (request.method === "GET") {
      await database.connect();

      const result = await findById(request.query);

      await database.disconnect();
      return result;
    }
  }

  return { handle };
}
