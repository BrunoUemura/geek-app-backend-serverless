import { VercelRequest, VercelResponse } from '@vercel/node';

import CreateListItemService from '../services/CreateListItemService';
import { ListItemRepository } from '../repositories';
import { ListRepository } from '../../list/repositories';
import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { handleResponse } from '../../../shared/handleResponse';
import { handleError } from '../../../shared/errors/handleError';
import { DBConnection } from '../../../shared/decorators/DBConnection';
import { isAuthenticated } from '../../../shared/isAuthenticated';

class ListItemController {
  private readonly listRepository;
  private readonly listItemRepository;
  private readonly createListItemService;

  constructor() {
    this.listRepository = ListRepository();
    this.listItemRepository = ListItemRepository();
    this.createListItemService = CreateListItemService(
      this.listRepository,
      this.listItemRepository,
    );
  }

  @DBConnection()
  private async create(request: VercelRequest, response: VercelResponse) {
    const { id } = request.query;
    const { title, season, episode, chapter, link, image } = request.body;

    try {
      await isAuthenticated(request, response);

      const result = await this.createListItemService.execute({
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

  public async handle(request: VercelRequest, response: VercelResponse) {
    if (request.method === 'POST') {
      return this.create(request, response);
    }

    return handleResponse(
      HTTP_STATUS_CODES.NOT_FOUND,
      `Requested http method [${request.method}] not available`,
      response,
    );
  }
}

export default new ListItemController();
