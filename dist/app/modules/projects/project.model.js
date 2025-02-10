"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveLink: { type: String, required: true },
    image: { type: String, required: true },
    techStack: { type: [String], required: true },
}, {
    timestamps: true,
});
exports.ProjectModel = (0, mongoose_1.model)('Project', projectSchema);
