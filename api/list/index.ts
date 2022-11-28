import type { VercelRequest, VercelResponse } from '@vercel/node';

import ListController from '../../src/modules/list/controllers/ListController';

export default function (request: VercelRequest, response: VercelResponse) {
  return ListController.handle(request, response);
}
