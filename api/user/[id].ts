import type { VercelRequest, VercelResponse } from '@vercel/node';

import { allowCors } from '../../src/config/server-config';
import UserControllerFunction from '../../src/modules/user/controllers/UserController';

function handler(request: VercelRequest, response: VercelResponse) {
  return UserControllerFunction.handle(request, response);
}

export default allowCors(handler);
