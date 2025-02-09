import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const blockUserHandle = catchAsync(async (req, res) => {
  await UserServices.blockUserHandleFromDB(req.params.userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: HttpStatus.OK,
  });
});

export const userControllers = {
  blockUserHandle,
};
