import type { VercelRequest, VercelResponse } from '@vercel/node';

import { allowCors } from '../../../../src/config/server-config';
import ListItemByIdController from '../../../../src/modules/listItem/controllers/ListItemByIdController';

function handler(request: VercelRequest, response: VercelResponse) {
  return ListItemByIdController.handle(request, response);
}

export default allowCors(handler);
