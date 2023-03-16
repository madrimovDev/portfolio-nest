import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async create(createSkillDto: Omit<CreateSkillDto, 'img'>, iconPath: string) {
    return this.prisma.skills.create({
      data: {
        link: createSkillDto.link,
        name: createSkillDto.name,
        icon: iconPath,
      },
    });
  }

  async findAll() {
    return this.prisma.skills.findMany();
  }

  async update(
    id: number,
    updateSkillDto: Omit<UpdateSkillDto, 'img'>,
    iconPath?: string,
  ) {
    return this.prisma.skills.update({
      where: {
        id,
      },
      data: {
        name: updateSkillDto.name,
        link: updateSkillDto.link,
        icon: iconPath,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.skills.delete({
      where: {
        id,
      },
    });
  }
}
