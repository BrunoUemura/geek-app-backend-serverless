import { Request, Response } from 'express';

import { httpStatusCodes } from '../../../shared/constants/httpStatusCodes';
import { handleResponse } from '../../../shared/handleResponse';
import { ListRepository } from '../repositories/implementation/prisma/ListRepository';
import { FindAllListService } from '../services/FindAllListService';
import { FindByIdListService } from '../services/FindByIdListService';
import { CreateListService } from '../services/CreateListService';
import { UpdateListService } from '../services/UpdateListService';
import { DeleteListService } from '../services/DeleteListService';
import { UserController } from '../../user/controllers/UserController';

export class ListController {
  async findAll(_request: Request, response: Response): Promise<Response> {
    const listRepository = new ListRepository();
    const findAllListService = new FindAllListService(listRepository);

    const result = await findAllListService.execute();

    return handleResponse(httpStatusCodes.OK, result, response);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRepository = new ListRepository();
    const findByIdListService = new FindByIdListService(listRepository);

    const result = await findByIdListService.execute(id);

    return handleResponse(httpStatusCodes.OK, result, response);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId, title, description, category } = request.body;

    const userController = new UserController();
    const listRepository = new ListRepository();
    const createListService = new CreateListService(
      userController,
      listRepository,
    );

    const result = await createListService.execute({
      userId,
      title,
      description,
      category,
    });

    return handleResponse(httpStatusCodes.OK, result, response);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description, category } = request.body;

    const listRepository = new ListRepository();
    const updateListService = new UpdateListService(listRepository);

    const result = await updateListService.execute({
      id,
      title,
      description,
      category,
    });

    return handleResponse(httpStatusCodes.OK, result, response);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listRepository = new ListRepository();
    const deleteListService = new DeleteListService(listRepository);

    const result = await deleteListService.execute(id);

    return handleResponse(httpStatusCodes.OK, result, response);
  }
}
