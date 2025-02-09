import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], // Get the last element of the path array
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleZodError;
