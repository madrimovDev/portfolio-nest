import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import * as fs from 'fs';

@Injectable()
export class BlogsService {
  constructor(private readonly prsima: PrismaService) {}
  async create(createBlogDto: CreateBlogDto, img: string) {
    return this.prsima.blogs.create({
      data: {
        title: createBlogDto.title,
        content: createBlogDto.content,
        img: img,
      },
    });
  }

  async findAll() {
    return this.prsima.blogs.findMany();
  }

  async findOne(id: number) {
    return this.prsima.blogs.findUnique({ where: { id } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto, img: string) {
    return this.prsima.blogs.update({
      where: {
        id,
      },
      data: {
        title: updateBlogDto.title,
        content: updateBlogDto.content,
        img,
      },
    });
  }

  async remove(id: number) {
    const blog = await this.prsima.blogs.delete({ where: { id } });
    fs.rm(blog.img, (err) => {
      if (err) {
        throw err;
      }
    });
    return blog;
  }
}
