import { Admin } from '@prisma/client';

export class UserDto implements Omit<Admin, 'id'> {
  username: string;
  password: string;
}
