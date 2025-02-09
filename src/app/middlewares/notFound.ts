import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'http-status-ts';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'Resource not found',
    statusCode: HttpStatus.NOT_FOUND,
    error: {
      path: path.join(__dirname, '../../', 'app/middlewares/notFound.ts'),
      message: 'The requested resource was not found',
    },
    stack:
      process.env.NODE_ENV === 'development' ? new Error().stack : undefined,
  });
};

export default notFound;
