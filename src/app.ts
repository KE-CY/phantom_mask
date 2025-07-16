import bodyParser from 'body-parser';
import express from 'express';
import { AppDataSource } from './config/typeorm-config';
import logger from './utils/logger';

import { errorHandler } from './middlewares/errorHandler';
import healthRoutes from './routes/healthRoute';
import pharmacyRoutes from './routes/pharmacyRoute';

const app = express();

// Initialize TypeORM
AppDataSource.initialize()
  .then(() => {
    logger.info({ msg: 'TypeORM: Data Source has been initialized!' });
  })
  .catch((err) => {
    logger.error({ msg: `TypeORM: Error during Data Source initialization: ${err.message}`, param: { stack: err.stack } });
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '1tb' }));
app.use(bodyParser.json({ limit: '1tb' }));

// Routes
app.use('/health', healthRoutes);
app.use('/pharmacies', pharmacyRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;