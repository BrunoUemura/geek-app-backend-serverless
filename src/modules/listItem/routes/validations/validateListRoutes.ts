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
      listId: Joi.string().required(),
      title: Joi.string().required(),
      season: Joi.number(),
      episode: Joi.number(),
      chapter: Joi.number(),
      link: Joi.string(),
      image: Joi.string(),
    },
  });
}

export function validateUpdate() {
  return celebrate({
    [Segments.BODY]: {
      listId: Joi.string().required(),
      title: Joi.string().required(),
      season: Joi.number(),
      episode: Joi.number(),
      chapter: Joi.number(),
      link: Joi.string(),
      image: Joi.string(),
    },
  });
}
