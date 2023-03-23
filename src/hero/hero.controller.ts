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
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto, CreateHeroScheme } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { CustomFileInterceptor } from 'src/helpers/custom-fileinterseptor';
import { BodyValidate } from 'src/helpers/body-validation.pipe';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  @UseInterceptors(new CustomFileInterceptor().create())
  async create(
    @Body(new BodyValidate(CreateHeroScheme))
    createHeroDto: Omit<CreateHeroDto, 'img'>,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      const result = {
        message: 'Hero Created',
        hero: await this.heroService.create(createHeroDto, img.path),
      };
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    return {
      message: 'First Hero',
      hero: await this.heroService.findAll(),
    };
  }

  @Patch(':id')
  @UseInterceptors(new CustomFileInterceptor().create())
  async update(
    @Param('id') id: string,
    @Body() updateHeroDto: UpdateHeroDto,
    img: Express.Multer.File,
  ) {
    try {
      const result = {
        message: 'Updated',
        hero: await this.heroService.update(+id, updateHeroDto, img?.path),
      };
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = {
        message: 'Hero Deleted',
        hero: await this.heroService.remove(+id),
      };
      return result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
