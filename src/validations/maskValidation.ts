import Joi from "joi";

export class MaskValidationSchema {
  static readonly getMaskTransactionSummary = Joi.object({
    transactionStartDate: Joi.date().iso().required(),
    transactionEndDate: Joi.date().iso().required(),
  }).options({ stripUnknown: true });
}