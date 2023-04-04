import { AuthenticatedGuard } from './../auth/authenticated.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Post,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { CustomFileInterceptor } from 'src/helpers/custom-fileinterseptor';
import { CreateHeroDto, CreateHeroScheme } from './dto/create-hero.dto';
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
      const hero = await this.heroService.create(createHeroDto, img.path);
      const result = {
        message: 'Created',
        hero: hero,
      };
      return result;
    } catch (error) {
      throw new BadRequestException('error');
    }
  }
  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  @UseInterceptors(new CustomFileInterceptor().create())
  async update(
    @Param('id') id: string,
    @Body() updateHeroDto: UpdateHeroDto,
    @UploadedFile() img: Express.Multer.File,
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
  @Get()
  async findAll() {
    return {
      message: 'First Hero',
      hero: await this.heroService.findAll(),
    };
  }
}
