import { Router } from 'express';
import { AuthRouter } from '../modules/authentication/auth.routes';
import { ProjectRouter } from '../modules/projects/project.route';
const router = Router();

// Application routes
const moduleRoutes = [
  {
    path: '/auth',
    module: AuthRouter,
  },
  {
    path: '/projects',
    module: ProjectRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
