import express from 'express';
import { UserController } from '../controllers/userController';
import { UserValidation } from '../middlewares/userMiddlewares';

const router = express.Router();

router.get('/top-mask-buyers', UserValidation.topMaskBuyersQueryValidation, UserController.getTopMaskBuyers);

export default router;