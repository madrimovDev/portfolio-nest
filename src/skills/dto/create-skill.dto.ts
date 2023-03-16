import { Skills } from '@prisma/client';
export class CreateSkillDto implements Omit<Skills, 'id'> {
  name: string;
  icon: string;
  link: string;
}
