import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import { config } from '@/config/config.js';
import morganMiddleware from '@/config/morganMiddleware.js';
import Logger from '@/utils/logger.js';
import appRouter from '@/routes/index.js';
import notFoundHandler from '@/middleware/notFoundHandler.js';
import globalErrorHandler from '@/middleware/error.middleware.js';
import { swaggerDocs } from '@/config/swaggerConfig.js';
import connectDB from '@/config/db/index.js';


export class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public async start() {
    this.handleProcessEvents();
    await this.connectDatabase();
    this.initializeMiddlewares();
    this.setupRoutes();
    this.setupErrors();
    this.serverListen();
  }

  private async connectDatabase() {
    await connectDB();
  }

  private initializeMiddlewares() {
    this.app.use(
      helmet({
        contentSecurityPolicy: config.node_env !== 'DEVELOPMENT',
        crossOriginEmbedderPolicy: config.node_env !== 'DEVELOPMENT',
        referrerPolicy: { policy: 'no-referrer' },
        frameguard: { action: 'deny' },
      }),
    );
    this.app.use(express.json({ limit: '10kb', strict: true }));
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    this.app.use(morganMiddleware);
    this.app.use(express.static('public'));
  }

  private setupRoutes() {
    appRouter(this.app);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  private setupErrors() {
    this.app.use(notFoundHandler);
    this.app.use(globalErrorHandler);
  }

  private handleProcessEvents() {
    process.on('SIGINT', async () => {
      Logger.info('SIGINT received. Closing DB and exiting...');
      await mongoose.connection.close();
      process.exit(0);
    });

    process.on('uncaughtException', (err) => {
      Logger.error('Uncaught Exception:', err);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      Logger.error('Unhandled Rejection:', reason);
      process.exit(1);
    });
  }

  private serverListen() {
    this.app.listen(config.port, () => {
      Logger.info(
        `Server is running on http://localhost:${config.port} in ${config.node_env} mode`,
      );
    });
  }
}
