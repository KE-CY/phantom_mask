import Joi from 'joi';

export class PharmacyValidationSchema {
  static readonly openSchema = Joi.object({
    dayOfWeek: Joi.number().integer().min(0).max(6).required(),
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  }).options({ stripUnknown: true });

  static readonly idValidationSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  static readonly maskSortSchema = Joi.object({
    sortOrder: Joi.string().valid('DESC', 'ASC').default('ASC'),
    sortBy: Joi.string().valid('name', 'price').default('price'),
  }).options({ stripUnknown: true });
}