import { HeroPipe } from './hero.pipe';
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
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto, CreateHeroScheme } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  @UsePipes(new HeroPipe(CreateHeroScheme))
  @UseInterceptors(
    FileInterceptor('img', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, 1 + file.originalname.split('.')[1]);
        },
      }),
    }),
  )
  async create(
    @Body() createHeroDto: Omit<CreateHeroDto, 'img'>,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      return this.heroService.create(createHeroDto, img.path);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroService.remove(+id);
  }
}
