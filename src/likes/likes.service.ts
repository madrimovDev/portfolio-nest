import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(blogId: number, createLikeDto: CreateLikeDto) {
    return this.prisma.likes.create({
      data: {
        uid: createLikeDto.uid,
        blogsId: blogId,
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
