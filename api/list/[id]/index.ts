import type { VercelRequest, VercelResponse } from '@vercel/node';

import ListByIdController from '../../../src/modules/list/controllers/ListByIdController';

export default function (request: VercelRequest, response: VercelResponse) {
  return ListByIdController.handle(request, response);
}
