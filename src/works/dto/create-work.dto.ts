import * as Joi from 'joi';
import { Works } from '@prisma/client';
export class CreateWorkDto implements Omit<Works, 'id'> {
  title: string;
  description: string;
  source: string;
  img: string;
}

export const CreateWorkScheme = Joi.object<CreateWorkDto>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  source: Joi.string().required(),
});
