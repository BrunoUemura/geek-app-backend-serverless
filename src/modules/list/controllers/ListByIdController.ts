import { VercelRequest, VercelResponse } from '@vercel/node';

import FindByIdListService from '../services/FindByIdListService';
import UpdateListService from '../services/UpdateListService';
import DeleteListService from '../services/DeleteListService';
import { ListRepository } from '../repositories';
import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { handleResponse } from '../../../shared/handleResponse';
import { handleError } from '../../../shared/errors/handleError';
import { DBConnection } from '../../../shared/decorators/DBConnection';
import { isAuthenticated } from '../../../shared/isAuthenticated';

class ListByIdController {
  private readonly listRepository;
  private readonly findByIdListService;
  private readonly updateListService;
  private readonly deleteListService;

  constructor() {
    this.listRepository = ListRepository();
    this.findByIdListService = FindByIdListService(this.listRepository);
    this.updateListService = UpdateListService(this.listRepository);
    this.deleteListService = DeleteListService(this.listRepository);
  }

  @DBConnection()
  private async findById(request: VercelRequest, response: VercelResponse) {
    const { id } = request.query;

    try {
      const result = await this.findByIdListService.execute(String(id));
      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  @DBConnection()
  private async update(request: VercelRequest, response: VercelResponse) {
    const { id } = request.query;
    const { title, description, category } = request.body;

    try {
      await isAuthenticated(request, response);

      const result = await this.updateListService.execute({
        id: String(id),
        title,
        description,
        category,
      });

      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  @DBConnection()
  private async deleteById(request: VercelRequest, response: VercelResponse) {
    const { id } = request.query;

    try {
      await isAuthenticated(request, response);

      const result = await this.deleteListService.execute(String(id));

      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  public async handle(request: VercelRequest, response: VercelResponse) {
    if (request.method === 'GET') {
      return this.findById(request, response);
    }

    if (request.method === 'PUT') {
      return this.update(request, response);
    }

    if (request.method === 'DELETE') {
      return this.deleteById(request, response);
    }

    return handleResponse(
      HTTP_STATUS_CODES.NOT_FOUND,
      `Requested http method [${request.method}] not available`,
      response,
    );
  }
}

export default new ListByIdController();
