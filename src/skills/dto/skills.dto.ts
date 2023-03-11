import { Skills } from '@prisma/client';
import Joi from 'joi';

export type SkillsDto = Omit<Skills, 'id'>;

export const skillsScheme = Joi.object<SkillsDto>({
  name: Joi.string().required(),
  icon: Joi.string(),
  link: Joi.link().required(),
});
