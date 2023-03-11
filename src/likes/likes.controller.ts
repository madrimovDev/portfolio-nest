import { LikesParams } from './interfaces/params.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('blogs/:blogId/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post()
  async create(
    @Param() ids: { blogId: string },
    @Body() createLikeDto: CreateLikeDto,
  ) {
    try {
      const like = await this.likesService.create(+ids.blogId, createLikeDto);
      return {
        message: 'Liked this blog',
        like,
      };
    } catch (error) {
      throw new ForbiddenException('Something Went Wrong', {
        cause: error,
      });
    }
  }

  @Get()
  async findAll(
    @Param()
    ids: Pick<LikesParams, 'blogId'>,
  ) {
    try {
      const likes = await this.likesService.findAll(+ids.blogId);
      return {
        message: 'All Likes',
        likes,
      };
    } catch (error) {
      throw new ForbiddenException('Something Went Wrong', {
        cause: error,
      });
    }
  }

  @Delete(':id')
  async remove(@Param() ids: Pick<LikesParams, 'id'>) {
    try {
      const like = await this.likesService.remove(+ids.id);
      return {
        message: 'Unliked',
        like,
      };
    } catch (error) {
      throw new ForbiddenException('Something Went Wrong', {
        cause: error,
      });
    }
  }
}
