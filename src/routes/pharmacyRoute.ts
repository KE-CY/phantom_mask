import express from 'express';
import { PharmacyController } from '../controllers/pharmacyController';
import { PharmacyValidation } from '../middlewares/pharmacyMiddlewares';

const router = express.Router();

router.get('/:id/masks', PharmacyValidation.pathParamByIdValidation, PharmacyValidation.maskSortValidation, PharmacyController.getMasksByPharmacyId);
router.get('/', PharmacyController.getList);
router.get('/open', PharmacyValidation.pharmacyQueryValidation, PharmacyController.getList);
router.get('/mask-filter', PharmacyValidation.maskFilterSchema, PharmacyController.getList); // TODO: 有 bug 需要修正

export default router;
