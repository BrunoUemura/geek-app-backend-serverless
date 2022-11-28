import type { VercelRequest, VercelResponse } from '@vercel/node';

import { allowCors } from '../../../src/config/server-config';
import ListByIdController from '../../../src/modules/list/controllers/ListByIdController';

function handler(request: VercelRequest, response: VercelResponse) {
  return ListByIdController.handle(request, response);
}

export default allowCors(handler);
