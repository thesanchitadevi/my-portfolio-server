import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';
import { ProjectControllers } from './project.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectControllers.createProject,
);

router.get('/', ProjectControllers.getProjects);

router.get('/:id', ProjectControllers.getProjectById);

router.put(
  '/:id',
  validateRequest(ProjectValidation.updateProjectValidationSchema),
  ProjectControllers.updateProject,
);

router.delete('/:id', ProjectControllers.deleteProject);

export const ProjectRouter = router;
