import Joi from "joi";

export class UserValidationSchema {
  static readonly topMaskBuyersSchema = Joi.object({
    transactionStartDate: Joi.date().iso().required(),
    transactionEndDate: Joi.date().iso().required(),
    limit: Joi.number().min(1).default(10),
  }).options({ stripUnknown: true });
}