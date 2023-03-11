import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}
  async create(createBlogDto: CreateBlogDto, imgPath: string) {
    return this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        content: createBlogDto.title,
        img: {
          create: {
            src: imgPath,
          },
        },
      },
    });
  }
  async findAll() {
    return this.prisma.blog.findMany({
      include: {
        likes: true,
        comments: true,
        img: true,
      },
    });
  }
  async findOne(id: number) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        likes: true,
        comments: true,
      },
    });
  }
  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: updateBlogDto,
    });
  }
  async remove(id: number) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
}
