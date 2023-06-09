import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import * as fs from 'fs';

@Injectable()
export class HeroService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createHeroDto: Omit<CreateHeroDto, 'img'>, img?: string) {
    return this.prisma.hero.create({
      data: {
        title: createHeroDto.title,
        description: createHeroDto.description,
        subtitle: createHeroDto.subtitle,
        img: img,
      },
    });
  }

  async findAll() {
    return this.prisma.hero.findFirst();
  }

  update(id: number, updateHeroDto: Omit<UpdateHeroDto, 'img'>, img?: string) {
    return this.prisma.hero.update({
      where: {
        id,
      },
      data: {
        title: updateHeroDto.title,
        description: updateHeroDto.description,
        subtitle: updateHeroDto.subtitle,
        img: img,
      },
    });
  }

  async remove(id: number) {
    const hero = await this.prisma.hero.delete({ where: { id } });

    const path = hero.img;

    fs.rm(path, (err) => {
      if (err) {
        throw new ForbiddenException(err);
      }
      console.log('deleted');
    });

    return hero;
  }
}
