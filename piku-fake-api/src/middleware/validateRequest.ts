import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e) => e.message) });
    }

    next();
  };
};

export default validateRequest;
