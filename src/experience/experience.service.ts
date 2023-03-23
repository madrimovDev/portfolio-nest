import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: createExperienceDto,
    });
  }

  async findAll() {
    return this.prisma.experience.findMany();
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return this.prisma.experience.update({
      where: {
        id,
      },
      data: {
        year: updateExperienceDto.year,
        description: updateExperienceDto.description,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.experience.delete({ where: { id } });
  }
}
