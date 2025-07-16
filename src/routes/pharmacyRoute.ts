import express from 'express';
import { getList, getMasksByPharmacyId } from '../controllers/pharmacyController';
import { maskSortValidation, pathParamByIdValidation, pharmacyValidation } from '../middlewares/pharmacyMiddlewares';

const router = express.Router();

router.get('/:id/masks', pathParamByIdValidation, maskSortValidation, getMasksByPharmacyId);
router.get('/open', pharmacyValidation, getList);

export default router;
