import { Schema, model } from 'mongoose';
import { IProject } from './projects.interface';

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    liveLink: { type: String, required: true },
    image: { type: String, required: true },
    techStack: { type: [String], required: true },
  },
  {
    timestamps: true,
  },
);

export const ProjectModel = model<IProject>('Project', projectSchema);
