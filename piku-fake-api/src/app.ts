import express from 'express';
import { config } from '@/config/config.js';
import morganMiddleware from '@/config/morganMiddleware.js';
import Logger from '@/utils/logger.js';
import indexRouter from '@/routes/index.js';
import loggerRouter from '@/routes/logger.js';

export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public start() {
    this.middlewares();
    this.setupRoutes();
    this.serverListen();
  }

  private middlewares() {
    this.app.use(express.json({ limit: '10kb', strict: true }));
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    this.app.use(morganMiddleware);
  }

  private setupRoutes() {
    this.app.use(indexRouter);
    this.app.use(loggerRouter);
  }
  private serverListen() {
    this.app.listen(config.port, () => {
      Logger.info(
        `Server is running on http://localhost:${config.port} in ${config.node_env} mode`,
      );
    });
  }
}
