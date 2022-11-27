import { Router } from 'express';

import {
  validateById,
  validateCreate,
  validateUpdate,
} from './validations/validateListRoutes';
import { ListController } from '../controllers/ListController';
import { isAuthenticated } from '../../../infra/http/middlewares/isAuthenticated';

const listRoutes = Router();
const listController = new ListController();

listRoutes.get('/list', listController.findAll);
listRoutes.get('/list/:id', listController.findById);
listRoutes.post(
  '/list',
  isAuthenticated,
  validateCreate(),
  listController.create,
);
listRoutes.put(
  '/list/:id',
  isAuthenticated,
  validateUpdate(),
  listController.update,
);
listRoutes.delete(
  '/list/:id',
  isAuthenticated,
  validateById(),
  listController.delete,
);

export { listRoutes };
