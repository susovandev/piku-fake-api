import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import { config, swaggerDocs, connectDB } from '@/config/index.js';
import {
  morganMiddleware,
  notFoundHandler,
  globalErrorHandler,
} from '@/middleware/index.js';
import { Logger } from '@/utils/index.js';
import appRouter from '@/routes/index.js';
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

  private async serverListen() {
    try {
      this.app.listen(config.port, () => {
        Logger.info(
          `Server is running on http://localhost:${config.port} in ${config.node_env} mode`,
        );
      });
    } catch (error) {
      Logger.error(`Server startup failed: `, error);
    }
  }
}
