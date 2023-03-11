import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async create(blogId: number, createCommentDto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: {
        comment: createCommentDto.comment,
        email: createCommentDto.email,
        Blog: {
          connect: {
            id: blogId,
          },
        },
      },
    });
  }

  async findAll(blogId: number) {
    return this.prisma.comments.findMany({
      where: {
        Blog: {
          is: {
            id: blogId,
          },
        },
      },
    });
  }

  async remove(commentId: number) {
    return this.prisma.comments.delete({
      where: {
        id: commentId,
      },
    });
  }
}
