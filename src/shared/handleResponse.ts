import { VercelResponse } from '@vercel/node';

export const handleResponse = (
  statusCode: number,
  data: any,
  response: VercelResponse,
) => {
  return response.status(statusCode).send({
    status: 'success',
    data: data,
  });
};
