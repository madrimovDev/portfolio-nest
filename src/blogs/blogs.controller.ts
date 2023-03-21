import { CustomFileInterceptor } from './../interceptor/custom.fileinterceptor';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseInterceptors(new CustomFileInterceptor().create())
  async create(
    @Res() res: Response,
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const blog = await this.blogsService.create(createBlogDto, image.path);
      return res.status(HttpStatus.CREATED).send({
        message: 'Blog Created',
        blog,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const blogs = await this.blogsService.findAll();
      return {
        message: 'All Blogs',
        blogs,
      };
    } catch (error) {
      throw new BadRequestException('Bad Request', {
        cause: error,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.findOne(+id);
      return {
        message: 'Blog',
        blog,
      };
    } catch (error) {
      throw new BadRequestException('Bad Request', {
        cause: error,
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      const blog = await this.blogsService.update(+id, updateBlogDto);
      return {
        message: 'Blog Updated',
        blog,
      };
    } catch (error) {
      throw new BadRequestException('Bad Request', {
        cause: error,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
