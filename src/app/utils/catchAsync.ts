import { NextFunction, Request, RequestHandler, Response } from 'express';

// Higher Order Function to handle the response.
const catchAsync = (handler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Promise resolve meaning the handler is executed successfully.
    Promise.resolve(handler(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;
