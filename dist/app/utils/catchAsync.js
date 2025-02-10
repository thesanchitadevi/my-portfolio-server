"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Higher Order Function to handle the response.
const catchAsync = (handler) => {
    return (req, res, next) => {
        // Promise resolve meaning the handler is executed successfully.
        Promise.resolve(handler(req, res, next)).catch((error) => next(error));
    };
};
exports.default = catchAsync;
