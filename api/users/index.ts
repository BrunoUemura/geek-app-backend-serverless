import type { VercelRequest, VercelResponse } from '@vercel/node';

import UsersControllerFunction from '../../src/modules/users/controllers/UsersController';

export default function (request: VercelRequest, response: VercelResponse) {
  return UsersControllerFunction(request, response).handle();
}
