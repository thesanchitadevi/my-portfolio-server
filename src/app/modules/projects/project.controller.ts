import catchAsync from '../../utils/catchAsync';
import { ProjectServices } from './project.service';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProjectDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

const getProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getProjectsDB(req.query);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    data: {
      meta: result.meta,
      result: result.result,
    },
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const result = await ProjectServices.getProjectByIdDB(req.params.id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.updateProjectDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  await ProjectServices.deleteProjectDB(req.params.id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
  });
});

export const ProjectControllers = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
