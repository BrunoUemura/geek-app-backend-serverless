import {
  VercelRequest,
  VercelRequestBody,
  VercelRequestQuery,
  VercelResponse,
} from "@vercel/node";

import CreateListItemService from "../services/CreateListItemService";
import { ListItemRepository } from "../repositories";
import { ListRepository } from "../../list/repositories";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleResponse } from "../../../shared/handleResponse";
import { handleError } from "../../../shared/errors/handleError";
import { database } from "../../../infra/db/prisma/connection";

export default function (request: VercelRequest, response: VercelResponse) {
  const listRepository = ListRepository();
  const listItemRepository = ListItemRepository();
  const createListItemService = CreateListItemService(
    listRepository,
    listItemRepository
  );

  async function create(
    requestQuery: VercelRequestQuery,
    requestBody: VercelRequestBody
  ) {
    const { id } = requestQuery;
    const { title, season, episode, chapter, link, image } = requestBody;

    try {
      const result = await createListItemService.execute({
        listId: String(id),
        title,
        season,
        episode,
        chapter,
        link,
        image,
      });

      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function handle() {
    if (request.method === "POST") {
      await database.connect();
      const result = await create(request.query, request.body);
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
