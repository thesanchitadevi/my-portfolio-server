import { HttpStatus } from 'http-status-ts';
import { AppError } from '../../errors/AppError';
import { UserModel } from './user.model';

// Block a user from the database
const blockUserHandleFromDB = async (userId: string) => {
  const user = await UserModel.findByIdAndUpdate(
    {
      _id: userId,
      role: 'cutomer',
    },
    { isBlocked: true },
    { new: true },
  );

  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

export const UserServices = {
  blockUserHandleFromDB,
};
