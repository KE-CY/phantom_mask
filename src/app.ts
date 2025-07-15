import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/typeorm-config';

import healthRoutes from './routes/healthRoute';
import logger from './utils/logger';

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

export default app;