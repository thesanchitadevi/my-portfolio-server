"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_ts_1 = require("http-status-ts");
const user_model_1 = require("../user/user.model");
const AppError_1 = require("../../errors/AppError");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = require("../../utils/sendEmail");
// Register a new user in the database
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the email is already taken
    if (yield user_model_1.UserModel.isEmailTaken(payload.email)) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.BAD_REQUEST, 'Email is already taken');
    }
    const user = yield user_model_1.UserModel.create(payload);
    return user;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.isUserExistsByEmail(payload.email);
    // Check if the user exists
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found');
    }
    // Check if the user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'User is blocked');
    }
    // Check if the password is matched
    const isPasswordMatched = yield user_model_1.UserModel.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    // access token
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    // refresh token
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exists
    const user = yield user_model_1.UserModel.isUserExistsByEmail(userData.email);
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found !');
    }
    // checking if the user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
    // checking if the password is correct
    if (!(yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'Password is incorrect !');
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bycrpt_salt));
    yield user_model_1.UserModel.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the token is missing
    if (!token) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // checking if the token is valid
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { email, iat } = decoded;
    // check if the user is exists
    const user = yield user_model_1.UserModel.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found !');
    }
    // checking if the user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
    if (user.passwordChangedAt &&
        user_model_1.UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exists
    const user = yield user_model_1.UserModel.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found !');
    }
    // checking if the user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    // access token
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resetLink = `${config_1.default.reset_paasword_url_link}?email=${user.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetLink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exists
    const user = yield user_model_1.UserModel.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'User not found !');
    }
    // checking if the user is blocked
    if (user.isBlocked) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if (decoded.email !== user.email) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bycrpt_salt));
    yield user_model_1.UserModel.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
});
exports.AuthServices = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
