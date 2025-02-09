import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

type TResponseData<T> = {
  statusCode: number;
  message?: string;
  success: boolean;
  meta?: TMeta;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
