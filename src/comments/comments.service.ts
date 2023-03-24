import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(blogId: number, createCommentDto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: {
        email: createCommentDto.email,
        comment: createCommentDto.comment,
        blogsId: blogId,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.comments.delete({
      where: {
        id,
      },
    });
  }
}
