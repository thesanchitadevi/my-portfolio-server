"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
const zod_1 = require("zod");
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(255),
        description: zod_1.z.string().min(10),
        liveLink: zod_1.z.string(),
        image: zod_1.z.string().url().optional(),
        techStack: zod_1.z.array(zod_1.z.string().min(1)).nonempty(),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3).max(255).optional(),
        description: zod_1.z.string().min(10).optional(),
        liveLink: zod_1.z.string().url().optional(),
        image: zod_1.z.string().url().optional(),
        techStack: zod_1.z.array(zod_1.z.string().min(1)).nonempty().optional(),
    }),
});
exports.ProjectValidation = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};
