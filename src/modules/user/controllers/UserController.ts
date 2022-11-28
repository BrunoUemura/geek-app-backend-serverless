import { VercelRequest, VercelResponse } from "@vercel/node";

import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { DBConnection } from "../../../shared/decorators/DBConnection";
import { handleError } from "../../../shared/errors/handleError";
import { handleResponse } from "../../../shared/handleResponse";
import { UserRepository } from "../repositories";
import FindUserByIdService from "../services/FindUserByIdService";

class UserController {
  private readonly userRepository;
  private readonly findUserByIdService;

  constructor() {
    this.userRepository = UserRepository();
    this.findUserByIdService = FindUserByIdService(this.userRepository);
  }

  @DBConnection()
  private async findById(request: VercelRequest, response: VercelResponse) {
    const { id } = request.query;

    try {
      const user = await this.findUserByIdService.execute(String(id));
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  public async handle(request: VercelRequest, response: VercelResponse) {
    if (request.method === "GET") {
      return this.findById(request, response);
    }
  }
}

export default new UserController();
