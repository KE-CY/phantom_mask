import express from 'express';
import { HealthController } from '../controllers/healthController';


const router = express.Router();

router.get('/', HealthController.healthCheck);

export default router;
