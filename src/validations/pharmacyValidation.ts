import Joi from 'joi';

export const openSchema = Joi.object({
  dayOfWeek: Joi.number().integer().min(0).max(6).required(),    
  time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required()
}).options({ stripUnknown: true });

export const idValidationSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});