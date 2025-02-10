import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(10),
    liveLink: z.string(),
    image: z.string().url().optional(),
    techStack: z.array(z.string().min(1)).nonempty(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    description: z.string().min(10).optional(),
    liveLink: z.string().url().optional(),
    image: z.string().url().optional(),
    techStack: z.array(z.string().min(1)).nonempty().optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
