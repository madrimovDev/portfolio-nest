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
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { CustomFileInterceptor } from 'src/helpers/custom-fileinterseptor';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  async findAll() {
    return {
      message: 'First Hero',
      hero: await this.heroService.findAll(),
    };
  }

  @UseGuards(AuthenticatedGuard)
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
}
