import Joi from "joi";

export class MaskValidationSchema {
  static readonly getMaskTransactionSummary = Joi.object({
    transactionStartDate: Joi.date().iso().required(),
    transactionEndDate: Joi.date().iso().required(),
  }).options({ stripUnknown: true });

  static readonly maskPurchaseSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    items: Joi.array()
      .items(
        Joi.object({
          pharmacyId: Joi.number().integer().positive().required(),
          maskId: Joi.number().integer().positive().required(),
          quantity: Joi.number().integer().min(1).required(),
        })
      ).min(1).required(),
  });
}