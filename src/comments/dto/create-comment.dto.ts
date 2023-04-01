import { Comments } from '@prisma/client';

type CreateCommentType = Omit<Comments, 'id'>;

export class CreateCommentDto implements Omit<CreateCommentType, 'blogsId'> {
  email: string;
  comment: string;
}
