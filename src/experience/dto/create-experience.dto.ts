import { Experience } from '@prisma/client';
import * as Joi from 'joi';

export class CreateExperienceDto implements Omit<Experience, 'id'> {
  year: number;
  description: string;
}

export const CreateExperienceScheme = Joi.object<CreateExperienceDto>({
  year: Joi.number().min(2000).required(),
  description: Joi.string().required(),
}).options({
  abortEarly: false,
});
