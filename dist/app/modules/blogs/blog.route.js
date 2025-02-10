"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = __importDefault(require("express"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.get('/', blog_controller_1.BlogControllers.getBlogs);
router.get('/:id', blog_controller_1.BlogControllers.getBlogById);
router.put('/:id', (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogValidationSchema), blog_controller_1.BlogControllers.updateBlog);
router.delete('/:id', blog_controller_1.BlogControllers.deleteBlog);
exports.BlogRouter = router;
