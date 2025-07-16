import express from 'express';
import { getList } from '../controllers/pharmacyController';
import { pharmacyValidation } from '../middlewares/pharmacyMiddlewares';

const router = express.Router();

router.get('/open', pharmacyValidation, getList);

export default router;
