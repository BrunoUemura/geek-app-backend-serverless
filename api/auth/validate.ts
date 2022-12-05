import type { VercelRequest, VercelResponse } from '@vercel/node';

import { allowCors } from '../../src/config/server-config';
import AuthController from '../../src/modules/user/controllers/AuthController';

function handler(request: VercelRequest, response: VercelResponse) {
  return AuthController.handle(request, response);
}

export default allowCors(handler);
