import { Blogs } from '@prisma/client';
import * as Joi from 'joi';

type BlogType = Omit<Blogs, 'id'>;

export class CreateBlogDto implements Omit<BlogType, 'img'> {
  title: string;
  content: string;
}

export const CreateBlogScheme = Joi.object<CreateBlogDto>({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).options({
  abortEarly: false,
});
