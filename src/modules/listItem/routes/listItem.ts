import { Router } from 'express';

import {
  validateById,
  validateCreate,
  validateUpdate,
} from './validations/validateListRoutes';
import { ListItemController } from '../controllers/ListItemController';
import { isAuthenticated } from '../../../infra/http/middlewares/isAuthenticated';

const listItemRoutes = Router();
const listItemController = new ListItemController();

listItemRoutes.post(
  '/list-item',
  isAuthenticated,
  validateCreate(),
  listItemController.create,
);

listItemRoutes.put(
  '/list-item/:id',
  isAuthenticated,
  validateUpdate(),
  listItemController.update,
);

listItemRoutes.delete(
  '/list-item/:id',
  isAuthenticated,
  validateById(),
  listItemController.delete,
);

export { listItemRoutes };
