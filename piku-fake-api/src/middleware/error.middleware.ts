import { CustomError } from '@/utils/index.js';
import { Request, Response } from 'express';

const globalErrorHandler = (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  const response: {
    statusCode: number;
    status: boolean;
    message: string;
    error?: CustomError;
  } = {
    statusCode,
    status: false,
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.error = err;
  }

  res.status(statusCode).json(response);
};

export default globalErrorHandler;
