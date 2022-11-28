import type { VercelRequest, VercelResponse } from '@vercel/node';

import { allowCors } from '../../src/config/server-config';
import ListController from '../../src/modules/list/controllers/ListController';

function handler(request: VercelRequest, response: VercelResponse) {
  return ListController.handle(request, response);
}

export default allowCors(handler);
