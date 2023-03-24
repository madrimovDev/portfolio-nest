import { AuthenticatedGuard } from './../auth/authenticated.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, CreateBlogScheme } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CustomFileInterceptor } from 'src/helpers/custom-fileinterseptor';
import { BodyValidate } from 'src/helpers/body-validation.pipe';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  @UseInterceptors(new CustomFileInterceptor().create())
  async create(
    @Body(new BodyValidate(CreateBlogScheme)) createBlogDto: CreateBlogDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      const blog = await this.blogsService.create(createBlogDto, img.path);
      return {
        message: 'Created',
        blog,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get()
  async findAll() {
    try {
      const blogs = await this.blogsService.findAll();
      return {
        message: 'All blogs',
        blogs,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.findOne(+id);
      return {
        message: 'Unique Blog',
        blog,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  @UseInterceptors(new CustomFileInterceptor().create())
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      const blog = await this.blogsService.update(
        +id,
        updateBlogDto,
        img?.path,
      );
      return {
        message: 'Updated',
        blog,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const blog = await this.blogsService.remove(+id);
      return {
        message: 'Deleted',
        blog,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
