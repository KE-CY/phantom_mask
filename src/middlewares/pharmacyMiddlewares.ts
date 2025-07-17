
import { PharmacyValidationSchema } from '../validations/pharmacyValidation';
import { RequestValidator } from './validateRequest';
export class PharmacyValidation {
  static pharmacyQueryValidation = RequestValidator.validateQuery(PharmacyValidationSchema.openSchema);

  static pathParamByIdValidation = RequestValidator.validateParams(PharmacyValidationSchema.idValidationSchema);

  static maskSortValidation = RequestValidator.validateQuery(PharmacyValidationSchema.maskSortSchema);

  static maskFilterSchema = RequestValidator.validateQuery(PharmacyValidationSchema.maskFilterSchema);
}