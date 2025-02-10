import express from 'express';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getBlogs);

router.get('/:id', BlogControllers.getBlogById);

router.put(
  '/:id',
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', BlogControllers.deleteBlog);

export const BlogRouter = router;
