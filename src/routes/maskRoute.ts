import express from 'express';
import { MaskController } from '../controllers/maskController';
import { MaskValidation } from '../middlewares/maskMiddlewares';

const router = express.Router();

router.get('/transactions/summary', MaskValidation.getMaskTransactionSummaryQueryValidation, MaskController.getTransactionSummary);
router.get('/', MaskController.getList);

export default router;