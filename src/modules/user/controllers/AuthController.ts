import { VercelRequest, VercelRequestBody, VercelResponse } from "@vercel/node";

import SignInUserService from "../services/SignInUserService";
import SignUpUserService from "../services/SignUpUserService";
import { handleResponse } from "../../../shared/handleResponse";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { UserRepository } from "../repositories";
import { handleError } from "../../../shared/errors/handleError";

export default function (request: VercelRequest, response: VercelResponse) {
  const userRepository = UserRepository();
  const signInUserService = SignInUserService(userRepository);
  const signUpUserService = SignUpUserService(userRepository);

  async function signInUser({
    email,
    password,
  }: VercelRequestBody): Promise<VercelResponse> {
    try {
      const user = await signInUserService.execute({
        email,
        password,
      });
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function signUpUser({
    username,
    email,
    password,
  }: VercelRequestBody): Promise<VercelResponse> {
    try {
      const user = await signUpUserService.execute({
        username,
        email,
        password,
      });
      return handleResponse(HTTP_STATUS_CODES.CREATED, user, response);
    } catch (error: any) {
      return handleError(error, response);
    }
  }

  async function handle() {
    if (request.method === "POST" && request.url?.includes("/signin")) {
      return signInUser(request.body);
    }

    if (request.method === "POST" && request.url?.includes("/signup")) {
      return signUpUser(request.body);
    }
  }

  return { handle };
}
