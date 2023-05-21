import { IBlog } from '../blog.interface';

export class CreateBlogResponse implements IBlog {
  id: string;
  userId: string;
  title: string;
  content: string;
  description: string;
  createdAt: string;
}
