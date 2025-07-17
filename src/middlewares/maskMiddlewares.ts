
import { MaskValidationSchema } from '../validations/maskValidation';
import { RequestValidator } from './validateRequest';
export class MaskValidation {
  static getMaskTransactionSummaryQueryValidation = RequestValidator.validateQuery(MaskValidationSchema.getMaskTransactionSummary);
}