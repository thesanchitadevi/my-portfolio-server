import { HttpStatus } from 'http-status-ts';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

export const createBlogDB = async (blogData: IBlog) => {
  return await BlogModel.create(blogData);
};

export const getBlogsDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(BlogModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await blogQuery.countTotal();
  const result = await blogQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getBlogByIdDB = async (id: string) => {
  const result = await BlogModel.findById(id);

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  return result;
};

const updateBlogDB = async (id: string, updateData: Partial<IBlog>) => {
  const result = await BlogModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  return result;
};

const deleteBlogDB = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  return result;
};

export const BlogServices = {
  createBlogDB,
  getBlogsDB,
  getBlogByIdDB,
  updateBlogDB,
  deleteBlogDB,
};
