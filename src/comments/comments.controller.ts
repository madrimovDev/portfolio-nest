import { CommentsParams } from './interface/comment-params';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('blogs/:blogId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param() ids: Pick<CommentsParams, 'blogId'>,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      const comment = await this.commentsService.create(
        +ids.blogId,
        createCommentDto,
      );
      return {
        message: 'Commented',
        comment,
      };
    } catch (error) {
      throw new ForbiddenException('Forbidden', {
        cause: error,
      });
    }
  }

  @Get()
  async findAll(@Param() ids: Pick<CommentsParams, 'blogId'>) {
    try {
      const comments = await this.commentsService.findAll(+ids.blogId);
      return {
        message: 'All Comments',
        comments,
      };
    } catch (error) {
      throw new ForbiddenException('Forbidden', {
        cause: error,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') ids: CommentsParams) {
    try {
      const comment = await this.commentsService.remove(+ids.id);
      return {
        message: 'Comment Deleted',
        comment,
      };
    } catch (error) {
      throw new ForbiddenException('Forbidden', {
        cause: error,
      });
    }
  }
}
