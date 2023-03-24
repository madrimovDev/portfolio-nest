import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('blogs/:blogId/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(
    @Param('blogId') blogId: string,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likesService.create(+blogId, createLikeDto);
  }

  @Delete(':id')
  remove(@Param() { id }: { blogId: string; id: string }) {
    return this.likesService.remove(+id);
  }
}
