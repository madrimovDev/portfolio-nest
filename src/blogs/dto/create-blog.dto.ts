import { Blog } from '@prisma/client';

export class CreateBlogDto implements Omit<Blog, 'id'> {
  title: string;
  content: string;
}
