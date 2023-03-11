import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}
  async create(blogId: number, createLikeDto: CreateLikeDto) {
    return this.prisma.likes.create({
      data: {
        uniqueId: createLikeDto.uniqueId,
        Blog: {
          connect: {
            id: blogId,
          },
        },
      },
    });
  }

  async findAll(blogId: number) {
    return this.prisma.likes.findMany({
      where: {
        Blog: {
          is: {
            id: blogId,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.likes.delete({
      where: {
        id,
      },
    });
  }
}
