import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = model<IBlog>('Blog', blogSchema);
