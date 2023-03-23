import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import * as fs from 'fs';

@Injectable()
export class WorksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createWorkDto: Omit<CreateWorkDto, 'img'>, img: string) {
    return this.prisma.works.create({
      data: {
        title: createWorkDto.title,
        description: createWorkDto.description,
        source: createWorkDto.source,
        img,
      },
    });
  }

  async findAll() {
    return this.prisma.works.findMany();
  }

  findOne(id: number) {
    return this.prisma.works.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateWorkDto: Omit<UpdateWorkDto, 'img'>,
    img?: string,
  ) {
    return this.prisma.works.update({
      where: { id },
      data: {
        title: updateWorkDto.title,
        description: updateWorkDto.description,
        source: updateWorkDto.source,
        img,
      },
    });
  }

  async remove(id: number) {
    const work = await this.prisma.works.delete({ where: { id } });
    fs.rm(work.img, (err) => {
      if (err) {
        throw new ForbiddenException(err);
      }
    });
    return work;
  }
}
