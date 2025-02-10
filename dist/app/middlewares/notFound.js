"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_ts_1 = require("http-status-ts");
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (_req, res, _next) => {
    res.status(http_status_ts_1.HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Resource not found',
        statusCode: http_status_ts_1.HttpStatus.NOT_FOUND,
        error: {
            path: path_1.default.join(__dirname, '../../', 'app/middlewares/notFound.ts'),
            message: 'The requested resource was not found',
        },
        stack: process.env.NODE_ENV === 'development' ? new Error().stack : undefined,
    });
};
exports.default = notFound;
