import { Likes } from '@prisma/client';

export class CreateLikeDto implements Omit<Likes, 'id'> {
  blogId: number;
  uniqueId: string;
}
