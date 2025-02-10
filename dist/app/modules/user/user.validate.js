"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be a string',
    })
        .nonempty('Password is required')
        .optional(),
});
exports.UserValidations = {
    createUserValidationSchema,
};
