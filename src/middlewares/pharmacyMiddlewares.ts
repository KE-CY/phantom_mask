
import { validateRequestQuery } from './validateRequest';
import { openSchema } from '../validations/pharmacyValidation';

export const pharmacyValidation = validateRequestQuery(openSchema);
