import { Comments } from '@prisma/client';

export class CreateCommentDto implements Omit<Comments, 'id'> {
  email: string;
  comment: string;
  blogId: number;
}
