import { Request, Response, NextFunction, RequestHandler } from 'express';

type ControllerType<
  Params = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<void | Response<ResBody>>;

const TryCatchHandler = <
  Params = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
>(
  passedFunc: ControllerType<Params, ResBody, ReqBody, ReqQuery>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> => {
  return async (req, res, next) => {
    try {
      await passedFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default TryCatchHandler;
