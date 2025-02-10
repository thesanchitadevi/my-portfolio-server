import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MessageServices } from './message.service';

const createMessage = catchAsync(async (req, res) => {
  const result = await MessageServices.createMessageDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getMessages = catchAsync(async (req, res) => {
  const result = await MessageServices.getMessagesDB(req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    data: {
      meta: result.meta,
      result: result.result,
    },
  });
});

export const MessageControllers = {
  createMessage,
  getMessages,
};
