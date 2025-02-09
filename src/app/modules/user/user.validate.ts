import { z } from 'zod';

const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .nonempty('Password is required')
    .optional(),
});

export const UserValidations = {
  createUserValidationSchema,
};
