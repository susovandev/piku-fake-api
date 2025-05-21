import { Router, Response } from 'express';

const router: Router = Router();

router.get('/', (_, res: Response) => {
  res.send('Hello world');
});

export default router;
