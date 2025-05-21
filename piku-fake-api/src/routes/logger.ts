import { Router, Response } from 'express';
import Logger from '../utils/logger.js';

const router: Router = Router();

router.get('/logger', (_, res: Response) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');
  res.send('Hello world');
});

export default router;
