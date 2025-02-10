"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const project_validation_1 = require("./project.validation");
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(project_validation_1.ProjectValidation.createProjectValidationSchema), project_controller_1.ProjectControllers.createProject);
router.get('/', project_controller_1.ProjectControllers.getProjects);
router.get('/:id', project_controller_1.ProjectControllers.getProjectById);
router.put('/:id', (0, validateRequest_1.default)(project_validation_1.ProjectValidation.updateProjectValidationSchema), project_controller_1.ProjectControllers.updateProject);
router.delete('/:id', project_controller_1.ProjectControllers.deleteProject);
exports.ProjectRouter = router;
