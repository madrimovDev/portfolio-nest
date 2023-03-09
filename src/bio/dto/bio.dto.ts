import { Bio } from '@prisma/client';
import Joi from 'joi';

export type BioDto = Bio;

export const bioScheme = Joi.object({
  year: Joi.date().required(),
  description: Joi.string().required(),
});
