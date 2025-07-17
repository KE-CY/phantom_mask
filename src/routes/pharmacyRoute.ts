import express from 'express';
import { PharmacyController } from '../controllers/pharmacyController';
import { PharmacyValidation } from '../middlewares/pharmacyMiddlewares';

const router = express.Router();

router.get('/:id/masks', PharmacyValidation.pathParamByIdValidation, PharmacyValidation.maskSortValidation, PharmacyController.getMasksByPharmacyId);
router.get('/open', PharmacyValidation.pharmacyQueryValidation, PharmacyController.getList);

export default router;
