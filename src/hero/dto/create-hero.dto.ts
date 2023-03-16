import { Hero } from '@prisma/client';

export class CreateHeroDto implements Omit<Hero, 'id'> {
  title: string;
  subtitle: string;
  description: string;
  img: string;
}
