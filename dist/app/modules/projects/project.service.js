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
exports.ProjectServices = void 0;
const http_status_ts_1 = require("http-status-ts");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = require("../../errors/AppError");
const project_model_1 = require("./project.model");
const createProjectDB = (projectData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.ProjectModel.create(projectData);
});
const getProjectsDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const projectQuery = new QueryBuilder_1.default(project_model_1.ProjectModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield projectQuery.countTotal();
    const result = yield projectQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getProjectByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findById(id);
    if (!result) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Project not found');
    }
    return result;
});
const updateProjectDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Project not found');
    }
    return result;
});
const deleteProjectDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.ProjectModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Project not found');
    }
    return result;
});
exports.ProjectServices = {
    createProjectDB,
    getProjectsDB,
    getProjectByIdDB,
    updateProjectDB,
    deleteProjectDB,
};
