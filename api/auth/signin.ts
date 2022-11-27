import type { VercelRequest, VercelResponse } from "@vercel/node";

import AuthController from "../../src/modules/user/controllers/AuthController";

export default function (request: VercelRequest, response: VercelResponse) {
  return AuthController(request, response).handle();
}
