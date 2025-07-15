import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});
