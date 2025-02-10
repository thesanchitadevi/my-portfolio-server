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
exports.BlogServices = exports.getBlogsDB = exports.createBlogDB = void 0;
const http_status_ts_1 = require("http-status-ts");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = require("../../errors/AppError");
const blog_model_1 = require("./blog.model");
const createBlogDB = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.BlogModel.create(blogData);
});
exports.createBlogDB = createBlogDB;
const getBlogsDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield blogQuery.countTotal();
    const result = yield blogQuery.modelQuery;
    return {
        meta,
        result,
    };
});
exports.getBlogsDB = getBlogsDB;
const getBlogByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findById(id);
    if (!result) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Blog not found');
    }
    return result;
});
const updateBlogDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Blog not found');
    }
    return result;
});
const deleteBlogDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogModel.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.AppError(http_status_ts_1.HttpStatus.NOT_FOUND, 'Blog not found');
    }
    return result;
});
exports.BlogServices = {
    createBlogDB: exports.createBlogDB,
    getBlogsDB: exports.getBlogsDB,
    getBlogByIdDB,
    updateBlogDB,
    deleteBlogDB,
};
