import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        error: error.details.map((e) => e.message.replaceAll('"', '')),
      });
    }

    next();
  };
};

export default validateRequest;
