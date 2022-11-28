import { VercelRequest, VercelResponse } from "@vercel/node";

import UpdateListItemService from "../services/UpdateListItemService";
import DeleteListItemService from "../services/DeleteListItemService";
import { ListItemRepository } from "../repositories";
import { ListRepository } from "../../list/repositories";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleResponse } from "../../../shared/handleResponse";
import { handleError } from "../../../shared/errors/handleError";
import { isAuthenticated } from "../../../shared/isAuthenticated";
import { DBConnection } from "../../../shared/decorators/DBConnection";

class ListItemByIdController {
  private readonly listRepository;
  private readonly listItemRepository;
  private readonly updateListItemService;
  private readonly deleteListItemService;

  constructor() {
    this.listRepository = ListRepository();
    this.listItemRepository = ListItemRepository();
    this.updateListItemService = UpdateListItemService(
      this.listRepository,
      this.listItemRepository
    );
    this.deleteListItemService = DeleteListItemService(
      this.listRepository,
      this.listItemRepository
    );
  }

  @DBConnection()
  private async update(request: VercelRequest, response: VercelResponse) {
    const { id: listId, itemid } = request.query;
    const { title, season, episode, chapter, link, image } = request.body;

    try {
      await isAuthenticated(request, response);

      const result = await this.updateListItemService.execute({
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

  @DBConnection()
  private async deleteById(request: VercelRequest, response: VercelResponse) {
    const { id: listId, itemid } = request.query;

    try {
      await isAuthenticated(request, response);

      const result = await this.deleteListItemService.execute(
        String(listId),
        String(itemid)
      );

      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  public async handle(request: VercelRequest, response: VercelResponse) {
    if (request.method === "PUT") {
      return this.update(request, response);
    }

    if (request.method === "DELETE") {
      return this.deleteById(request, response);
    }

    return handleResponse(
      HTTP_STATUS_CODES.NOT_FOUND,
      `Requested http method [${request.method}] not available`,
      response
    );
  }
}

export default new ListItemByIdController();
