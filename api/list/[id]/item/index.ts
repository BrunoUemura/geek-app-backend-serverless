import type { VercelRequest, VercelResponse } from '@vercel/node';

import ListItemController from '../../../../src/modules/listItem/controllers/ListItemController';

export default function (request: VercelRequest, response: VercelResponse) {
  return ListItemController.handle(request, response);
}
