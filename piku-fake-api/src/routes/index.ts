import { Application, Request, Response } from 'express';
import { Logger } from '@/utils/index.js';
import productRouter from '@/routes/product.routes.js';

const appRouter = (app: Application) => {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Hello world
   *     responses:
   *       200:
   *         description: A successful response
   */
  app.get('/', (_, res) => {
    res.send('Hello world');
  });

  /**
   * @swagger
   * /logger:
   *   get:
   *     description: Logs different types of messages and returns a success response
   *     responses:
   *       200:
   *         description: A successful response
   */
  app.get('/logger', (req: Request, res: Response) => {
    Logger.error('This is an error log');
    Logger.warn('This is a warn log');
    Logger.info('This is a info log');
    Logger.http('This is a http log');
    Logger.debug('This is a debug log');
    res.send('Hello world');
  });

  app.use('/api/v1/products', productRouter);
};

export default appRouter;
