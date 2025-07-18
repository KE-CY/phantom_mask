
import { UserValidationSchema } from '../validations/userValidation';
import { RequestValidator } from './validateRequest';
export class UserValidation {
  static topMaskBuyersQueryValidation = RequestValidator.validateQuery(UserValidationSchema.topMaskBuyersSchema);

}