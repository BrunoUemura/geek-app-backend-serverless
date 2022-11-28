import { VercelRequest, VercelResponse } from '@vercel/node';

import FindAllListService from '../services/FindAllListService';
import CreateListService from '../services/CreateListService';
import { ListRepository } from '../repositories';
import { UserRepository } from '../../user/repositories';
import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { handleResponse } from '../../../shared/handleResponse';
import { handleError } from '../../../shared/errors/handleError';
import { isAuthenticated } from '../../../shared/isAuthenticated';
import { DBConnection } from '../../../shared/decorators/DBConnection';

class ListController {
  private readonly listRepository;
  private readonly userRepository;
  private readonly findAllListService;
  private readonly createListService;

  constructor() {
    this.listRepository = ListRepository();
    this.userRepository = UserRepository();
    this.findAllListService = FindAllListService(this.listRepository);
    this.createListService = CreateListService(
      this.userRepository,
      this.listRepository,
    );
  }

  @DBConnection()
  private async findAll(request: VercelRequest, response: VercelResponse) {
    try {
      const result = await this.findAllListService.execute();
      return handleResponse(HTTP_STATUS_CODES.OK, result, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  @DBConnection()
  private async create(request: VercelRequest, response: VercelResponse) {
    const { userId, title, description, category } = request.body;
    try {
      await isAuthenticated(request, response);
      const result = await this.createListService.execute({
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

  public async handle(request: VercelRequest, response: VercelResponse) {
    if (request.method === 'GET') {
      return this.findAll(request, response);
    }

    if (request.method === 'POST') {
      return this.create(request, response);
    }
  }
}

export default new ListController();
