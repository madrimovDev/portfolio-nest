import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('blogs/:blogId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param() { blogId }: { blogId: string },
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(+blogId, createCommentDto);
  }

  @Delete(':id')
  remove(@Param() { id }: { id: string }) {
    return this.commentsService.remove(+id);
  }
}
