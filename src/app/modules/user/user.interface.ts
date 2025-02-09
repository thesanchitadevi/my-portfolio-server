import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name?: string;
  password: string;
  email: string;
  passwordChangedAt?: Date;
  role: 'admin' | 'customer';
  phone?: string;
  city?: string;
  address?: string;
  isBlocked: boolean;
}

export interface IUserStaticModel extends Model<IUser> {
  // check if the user is exists by custom id
  isUserExistsByEmail(email: string): Promise<IUser>;

  isEmailTaken(email: string): Promise<IUser>;

  // check if password is matched with hashed password
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
