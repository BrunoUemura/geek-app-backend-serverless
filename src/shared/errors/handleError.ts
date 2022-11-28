import { VercelResponse } from '@vercel/node';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';

import { AppError } from './AppError';

export function handleError(error: Error, response: VercelResponse) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
