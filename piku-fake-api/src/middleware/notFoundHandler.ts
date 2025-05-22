import { Request, Response } from 'express';
const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    status: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
};

export default notFoundHandler;
