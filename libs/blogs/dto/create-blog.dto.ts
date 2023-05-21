import { IBlog } from '../blog.interface';

export type BlogDto = Pick<IBlog, 'title' | 'description' | 'content'>;

export type CreateBlogDto = {
  userId: string;
  dto: BlogDto;
};
