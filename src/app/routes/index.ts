import { Router } from 'express';
import { AuthRouter } from '../modules/authentication/auth.routes';
import { ProjectRouter } from '../modules/projects/project.route';
import { UserRouter } from '../modules/user/user.routes';
import { BlogRouter } from '../modules/blogs/blog.route';
import { MessageRouter } from '../modules/message/message.route';
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
  {
    path: '/blogs',
    module: BlogRouter,
  },
  {
    path: '/messages',
    module: MessageRouter,
  },
  {
    path: '/users',
    module: UserRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
