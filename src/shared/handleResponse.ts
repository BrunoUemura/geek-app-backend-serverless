import { Response } from 'express';

export const handleResponse = (
  statusCode: number,
  data: any,
  response: Response,
) => {
  return response.status(statusCode).send({
    status: 'success',
    data: data,
  });
};
