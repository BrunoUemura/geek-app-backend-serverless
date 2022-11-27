import { VercelRequest, VercelRequestBody, VercelResponse } from "@vercel/node";

import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleResponse } from "../../../shared/handleResponse";
import { ListRepository } from "../repositories/implementation/prisma/ListRepository";
import FindAllListService from "../services/FindAllListService";
import CreateListService from "../services/CreateListService";
import { handleError } from "../../../shared/errors/handleError";
import { database } from "../../../infra/db/prisma/connection";
import { UserRepository } from "../../user/repositories";

export default function (request: VercelRequest, response: VercelResponse) {
  const listRepository = ListRepository();
  const userRepository = UserRepository();
  const findAllListService = FindAllListService(listRepository);
  const createListService = CreateListService(userRepository, listRepository);

  const findAll = async (): Promise<VercelResponse> => {
    try {
      const result = await findAllListService.execute();
      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  };

  async function create(
    requestBody: VercelRequestBody
  ): Promise<VercelResponse> {
    const { userId, title, description, category } = requestBody;

    try {
      const result = await createListService.execute({
        userId,
        title,
        description,
        category,
      });

      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function handle() {
    if (request.method === "GET") {
      await database.connect();

      const result = await findAll();

      await database.disconnect();
      return result;
    }

    if (request.method === "POST") {
      await database.connect();

      const result = await create(request.body);

      await database.disconnect();
      return result;
    }
  }

  return { handle };
}
