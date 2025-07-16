
import { idValidationSchema, maskSortSchema, openSchema } from '../validations/pharmacyValidation';
import { validateRequestParams, validateRequestQuery } from './validateRequest';

export const pharmacyValidation = validateRequestQuery(openSchema);

export const pathParamByIdValidation = validateRequestParams(idValidationSchema);

export const maskSortValidation = validateRequestQuery(maskSortSchema);