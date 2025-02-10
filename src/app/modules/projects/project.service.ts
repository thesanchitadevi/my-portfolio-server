import { HttpStatus } from 'http-status-ts';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { ProjectModel } from './project.model';
import { IProject } from './projects.interface';

const createProjectDB = async (projectData: IProject) => {
  return await ProjectModel.create(projectData);
};

const getProjectsDB = async (query: Record<string, unknown>) => {
  const projectQuery = new QueryBuilder(ProjectModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await projectQuery.countTotal();
  const result = await projectQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getProjectByIdDB = async (id: string) => {
  const result = await ProjectModel.findById(id);

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Project not found');
  }

  return result;
};

const updateProjectDB = async (id: string, updateData: Partial<IProject>) => {
  const result = await ProjectModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Project not found');
  }

  return result;
};

const deleteProjectDB = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Project not found');
  }

  return result;
};

export const ProjectServices = {
  createProjectDB,
  getProjectsDB,
  getProjectByIdDB,
  updateProjectDB,
  deleteProjectDB,
};
