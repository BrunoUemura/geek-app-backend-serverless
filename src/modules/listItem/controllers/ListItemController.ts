import { Request, Response } from 'express';

import { httpStatusCodes } from '../../../shared/constants/httpStatusCodes';
import { handleResponse } from '../../../shared/handleResponse';
import { ListItemRepository } from '../repositories/implementation/prisma/ListItemRepository';
import { ListRepository } from '../../list/repositories/implementation/prisma/ListRepository';
import { CreateListItemService } from '../services/CreateListItemService';
import { UpdateListItemService } from '../services/UpdateListItemService';
import { DeleteListItemService } from '../services/DeleteListItemService';

export class ListItemController {
  async create(request: Request, response: Response): Promise<Response> {
    const { listId, title, season, episode, chapter, link, image } =
      request.body;

    const listRepository = new ListRepository();
    const listItemRepository = new ListItemRepository();
    const createListItemService = new CreateListItemService(
      listRepository,
      listItemRepository,
    );

    const result = await createListItemService.execute({
      listId,
      title,
      season,
      episode,
      chapter,
      link,
      image,
    });

    return handleResponse(httpStatusCodes.OK, result, response);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, season, episode, chapter, link, image } = request.body;

    const listRepository = new ListRepository();
    const listItemRepository = new ListItemRepository();
    const updateListItemService = new UpdateListItemService(
      listRepository,
      listItemRepository,
    );

    const result = await updateListItemService.execute({
      id,
      title,
      season,
      episode,
      chapter,
      link,
      image,
    });

    return handleResponse(httpStatusCodes.OK, result, response);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRepository = new ListRepository();
    const listItemRepository = new ListItemRepository();
    const deleteListItemService = new DeleteListItemService(listItemRepository);

    const result = await deleteListItemService.execute(id);

    return handleResponse(httpStatusCodes.OK, result, response);
  }
}
