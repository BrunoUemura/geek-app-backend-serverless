import mongoose from 'mongoose';

import { delay } from '../../../shared/functions';
import { logger } from '../../../shared/logger';

const uri = String(process.env.DATABASE_URL);

async function connect() {
  let retries = 1;
  const maxRetries = Number(process.env.CONNECTION_RETRIES);

  while (retries <= maxRetries) {
    try {
      await mongoose.connect(uri);
      logger.info('[Database]: Successfully connected to Database');
      retries = maxRetries + 1;
    } catch (error) {
      logger.error('[Database]: Error connecting to Database');
      logger.info(`[Database]: Connection attempt ${retries}`);

      if (retries === maxRetries) {
        throw new Error('Failed to connect to Database');
      }

      retries++;
      await delay(Number(process.env.CONNECTION_RETRIES_DELAY));
    }
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    logger.info('[Database]: Successfully disconnected from Database');
  } catch (error) {
    logger.error('[Database]: Error disconnecting from Database');
  }
}

export const database = { connect, disconnect };
