import morgan, { StreamOptions } from 'morgan';
import Logger from '@/utils/logger.js';
import { config } from '@/config/config.js';

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = config.node_env || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

export default morganMiddleware;
