import { Hero } from '@prisma/client';
import * as Joi from 'joi';
export class CreateHeroDto implements Omit<Hero, 'id'> {
  title: string;
  subtitle: string;
  description: string;
  img: string;
}

export const CreateHeroScheme = Joi.object<CreateHeroDto>({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().required(),
}).options({
  abortEarly: false,
});
