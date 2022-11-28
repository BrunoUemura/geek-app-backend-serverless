import type { VercelRequest, VercelResponse } from "@vercel/node";

import UserControllerFunction from "../../src/modules/user/controllers/UserController";

export default function (request: VercelRequest, response: VercelResponse) {
  return UserControllerFunction.handle(request, response);
}
