import { VercelRequest, VercelResponse } from "@vercel/node";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { handleError } from "../../../shared/errors/handleError";
import { handleResponse } from "../../../shared/handleResponse";

import { UserRepository } from "../repositories";
import FindUserByIdService from "../services/FindUserByIdService";

export default function (request: VercelRequest, response: VercelResponse) {
  const userRepository = UserRepository();
  const findUserByIdService = FindUserByIdService(userRepository);

  async function findById(id: string): Promise<VercelResponse> {
    try {
      const user = await findUserByIdService.execute(id);
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function handle() {
    if (request.method === "GET") {
      return findById(String(request.query));
    }
  }

  return { handle };
}
