import type { VercelRequest, VercelResponse } from '@vercel/node';

import { allowCors } from '../../../../src/config/server-config';
import ListItemController from '../../../../src/modules/listItem/controllers/ListItemController';

function handler(request: VercelRequest, response: VercelResponse) {
  return ListItemController.handle(request, response);
}

export default allowCors(handler);
