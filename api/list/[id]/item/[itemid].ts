import type { VercelRequest, VercelResponse } from "@vercel/node";

import ListItemByIdController from "../../../../src/modules/listItem/controllers/ListItemByIdController";

export default function (request: VercelRequest, response: VercelResponse) {
  return ListItemByIdController.handle(request, response);
}
