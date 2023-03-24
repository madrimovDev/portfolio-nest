import { Likes } from '@prisma/client';

type LikesType = Omit<Likes, 'id'>;

export class CreateLikeDto implements Omit<LikesType, 'blogsId'> {
  uid: string;
}
