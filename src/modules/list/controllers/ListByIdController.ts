import {
  VercelRequest,
  VercelRequestBody,
  VercelRequestQuery,
  VercelResponse,
} from "@vercel/node";

import FindByIdListService from "../services/FindByIdListService";
import UpdateListService from "../services/UpdateListService";
import DeleteListService from "../services/DeleteListService";
import { ListRepository } from "../repositories";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleResponse } from "../../../shared/handleResponse";
import { handleError } from "../../../shared/errors/handleError";
import { database } from "../../../infra/db/prisma/connection";

export default function (request: VercelRequest, response: VercelResponse) {
  const listRepository = ListRepository();
  const findByIdListService = FindByIdListService(listRepository);
  const updateListService = UpdateListService(listRepository);
  const deleteListService = DeleteListService(listRepository);

  const findById = async (
    requestQuery: VercelRequestQuery
  ): Promise<VercelResponse> => {
    const { id } = requestQuery;

    try {
      const result = await findByIdListService.execute(String(id));
      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  };

  const update = async (
    requestQuery: VercelRequestQuery,
    requestBody: VercelRequestBody
  ): Promise<VercelResponse> => {
    const { id } = requestQuery;
    const { title, description, category } = requestBody;

    try {
      const result = await updateListService.execute({
        id: String(id),
        title,
        description,
        category,
      });

      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  };

  const deleteById = async (
    requestQuery: VercelRequestQuery
  ): Promise<VercelResponse> => {
    const { id } = requestQuery;

    try {
      const result = await deleteListService.execute(String(id));
      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  };

  async function handle() {
    if (request.method === "GET") {
      await database.connect();

      const result = await findById(request.query);

      await database.disconnect();
      return result;
    }

    if (request.method === "PUT") {
      await database.connect();

      const result = await update(request.query, request.body);

      await database.disconnect();
      return result;
    }

    if (request.method === "DELETE") {
      await database.connect();

      const result = await deleteById(request.query);

      await database.disconnect();
      return result;
    }

    return handleResponse(
      HTTP_STATUS_CODES.NOT_FOUND,
      `Requested http method [${request.method}] not available`,
      response
    );
  }

  return { handle };
}
