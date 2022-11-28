import { VercelRequest, VercelResponse } from "@vercel/node";

import { handleResponse } from "../../../shared/handleResponse";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleError } from "../../../shared/errors/handleError";
import { UserRepository } from "../repositories";
import SignInUserService from "../services/SignInUserService";
import SignUpUserService from "../services/SignUpUserService";
import { DBConnection } from "../../../shared/decorators/DBConnection";

class AuthController {
  private readonly userRepository;
  private readonly signInUserService;
  private readonly signUpUserService;

  constructor() {
    this.userRepository = UserRepository();
    this.signInUserService = SignInUserService(this.userRepository);
    this.signUpUserService = SignUpUserService(this.userRepository);
  }

  @DBConnection()
  private async signInUser(request: VercelRequest, response: VercelResponse) {
    const { email, password } = request.body;
    try {
      const user = await this.signInUserService.execute({
        email,
        password,
      });
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  @DBConnection()
  private async signUpUser(request: VercelRequest, response: VercelResponse) {
    const { username, email, password } = request.body;
    try {
      const user = await this.signUpUserService.execute({
        username,
        email,
        password,
      });
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  public async handle(request: VercelRequest, response: VercelResponse) {
    if (request.method === "POST" && request.url?.includes("/signin")) {
      return this.signInUser(request, response);
    }

    if (request.method === "POST" && request.url?.includes("/signup")) {
      return this.signUpUser(request, response);
    }
  }
}

export default new AuthController();
