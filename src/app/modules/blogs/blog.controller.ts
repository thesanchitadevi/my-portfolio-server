import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogsDB(req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    data: {
      meta: result.meta,
      result: result.result,
    },
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const result = await BlogServices.getBlogByIdDB(req.params.id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.updateBlogDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await BlogServices.deleteBlogDB(req.params.id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const BlogControllers = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
