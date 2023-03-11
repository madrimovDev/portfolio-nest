import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Likes } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}
  async create(createBlogDto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: createBlogDto,
    });
  }
  async findAll() {
    return this.prisma.blog.findMany();
  }
  async findOne(id: number) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }
  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: updateBlogDto,
    });
  }
  remove(id: number) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
  async liked(id: number, like: Omit<Likes, 'id'>) {
    return this.prisma.likes.create({
      data: like,
      include: {
        Blog: {
          where: {
            id,
          },
        },
      },
    });
  }
  async unLiked(id: number, likeId: number) {
    return this.prisma.likes.delete({
      where: {
        id: likeId,
      },
      include: {
        Blog: {
          where: {
            id,
          },
        },
      },
    });
  }
}
