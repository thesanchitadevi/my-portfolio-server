"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3),
        content: zod_1.z.string().min(10),
        category: zod_1.z.string().min(3),
        image: zod_1.z.string().optional(),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).optional(),
        content: zod_1.z.string().min(10).optional(),
        category: zod_1.z.string().min(3).optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
