import type { VercelRequest, VercelResponse } from "@vercel/node";

import UsersByIdController from "../../src/modules/users/controllers/UsersByIdController";

export default function (request: VercelRequest, response: VercelResponse) {
  return UsersByIdController(request, response).handle();
}
