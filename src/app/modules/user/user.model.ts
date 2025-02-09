import { model, Schema } from 'mongoose';
import { IUser, IUserStaticModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, IUserStaticModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Document middleware
// Middleware - pre save hook
userSchema.pre('save', async function (next) {
  // Hash the password
  this.password = await bcrypt.hash(this.password, Number(config.bycrpt_salt));

  next();
});

// Middleware - post save hook
userSchema.post('save', function (doc, next) {
  // doc
  doc.password = '**********'; // Hide the password
  next();
});

// Static methods to check if the user is exists by custom id
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

userSchema.statics.isEmailTaken = async function (email: string) {
  return await UserModel.findOne({ email });
};

export const UserModel = model<IUser, IUserStaticModel>('User', userSchema);
