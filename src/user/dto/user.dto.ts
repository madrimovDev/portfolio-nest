import Joi from 'joi';

export interface UserDTO {
  name: string;
  lastname: string;
  info: string;
  description: string;
}

export const userScheme = Joi.object<UserDTO>({
  name: Joi.string(),
  lastname: Joi.string(),
  info: Joi.string(),
  description: Joi.string(),
});
