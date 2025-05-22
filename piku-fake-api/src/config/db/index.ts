import { connect } from 'mongoose';
import Logger from '@/utils/logger.js';
import { config } from '@/config/index.js';

const connectDB = async () => {
  try {
    const connectionInstance = await connect(config.databaseUrl as string);
    Logger.info(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    Logger.error('Database connection error', error);
    process.exit(1);
  }
};

export default connectDB;
