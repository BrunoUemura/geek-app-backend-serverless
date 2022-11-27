import {
  VercelRequest,
  VercelRequestBody,
  VercelRequestQuery,
  VercelResponse,
} from "@vercel/node";

import UpdateListItemService from "../services/UpdateListItemService";
import DeleteListItemService from "../services/DeleteListItemService";
import { ListItemRepository } from "../repositories";
import { ListRepository } from "../../list/repositories";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleResponse } from "../../../shared/handleResponse";
import { handleError } from "../../../shared/errors/handleError";
import { database } from "../../../infra/db/prisma/connection";

export default function (request: VercelRequest, response: VercelResponse) {
  const listRepository = ListRepository();
  const listItemRepository = ListItemRepository();
  const updateListItemService = UpdateListItemService(
    listRepository,
    listItemRepository
  );
  const deleteListItemService = DeleteListItemService(
    listRepository,
    listItemRepository
  );

  async function update(
    requestQuery: VercelRequestQuery,
    requestBody: VercelRequestBody
  ) {
    const { id: listId, itemid } = requestQuery;
    const { title, season, episode, chapter, link, image } = requestBody;

    try {
      const result = await updateListItemService.execute({
        listId: String(listId),
        id: String(itemid),
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

  async function deleteById(requestQuery: VercelRequestQuery) {
    const { id: listId, itemid } = requestQuery;

    try {
      const result = await deleteListItemService.execute(
        String(listId),
        String(itemid)
      );
      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function handle() {
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
