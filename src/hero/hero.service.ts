import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  async create(createHeroDto: Omit<CreateHeroDto, 'img'>, imgPath: string) {
    const hero = await this.prisma.hero.findFirst();

    if (hero) {
      throw new ConflictException('Hero already exsits');
    }

    return await this.prisma.hero.create({
      data: {
        title: createHeroDto.title,
        description: createHeroDto.description,
        subtitle: createHeroDto.subtitle,
        img: imgPath,
      },
    });
  }

  async find() {
    return await this.prisma.hero.findFirst();
  }

  async update(
    id: number,
    updateHeroDto: Omit<UpdateHeroDto, 'img'>,
    impPath?: string,
  ) {
    const hero = await this.prisma.hero.update({
      where: {
        id,
      },
      data: {
        ...updateHeroDto,
        img: impPath,
      },
    });
    return hero;
  }
}
