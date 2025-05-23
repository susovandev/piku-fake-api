import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '@/config/index.js';
import { CustomError, Logger } from '@/utils/index.js';

const formatErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  err?: unknown,
) => {
  return res.status(statusCode).json({
    statusCode,
    status: false,
    message,
    ...(config.node_env === 'DEVELOPMENT' && { error: err }),
  });
};

const globalErrorHandler = (
  err: unknown,
  _: Request,
  res: Response,
  _next: NextFunction,
) => {
  Logger.error('Global error handler', err);
  if (err instanceof CustomError) {
    return formatErrorResponse(res, err.statusCode, err.message, err);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return formatErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      `Validation error: ${err.message}`,
      err,
    );
  }

  if (err instanceof mongoose.Error.CastError) {
    return formatErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      `Cast error: Invalid object ID format`,
      err,
    );
  }

  return formatErrorResponse(
    res,
    StatusCodes.INTERNAL_SERVER_ERROR,
    'Something went wrong',
    err,
  );
};

export default globalErrorHandler;
