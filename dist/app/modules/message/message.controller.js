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
exports.MessageControllers = void 0;
const http_status_ts_1 = require("http-status-ts");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const message_service_1 = require("./message.service");
const createMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_service_1.MessageServices.createMessageDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'Message created successfully',
        data: result,
    });
}));
const getMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_service_1.MessageServices.getMessagesDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        data: {
            meta: result.meta,
            result: result.result,
        },
    });
}));
exports.MessageControllers = {
    createMessage,
    getMessages,
};
