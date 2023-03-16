import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const title = req.body.title as string;
          const format = file.originalname.split('.').at(-1);
          const filename =
            title.split(' ').filter(Boolean).join('-') + '.' + format;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() createHeroDto: CreateHeroDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const hero = await this.heroService.create(createHeroDto, image.path);
      return {
        message: 'Hero created',
        hero,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const hero = await this.heroService.find();

      return {
        message: 'Hero',
        hero,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const title = req.body.title as string;
          const format = file.originalname.split('.').at(-1);
          const filename =
            title.split(' ').filter(Boolean).join('-') + '.' + format;
          callback(null, filename);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateHeroDto: UpdateHeroDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.heroService.update(+id, updateHeroDto, image?.path);
  }
}
