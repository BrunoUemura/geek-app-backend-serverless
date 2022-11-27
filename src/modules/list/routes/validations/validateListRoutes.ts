import { celebrate, Joi, Segments } from 'celebrate';

export function validateById() {
  return celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  });
}

export function validateCreate() {
  return celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string(),
      category: Joi.string(),
    },
  });
}

export function validateUpdate() {
  return celebrate({
    [Segments.BODY]: {
      userId: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
    },
  });
}
