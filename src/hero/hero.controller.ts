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
  Req,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto, CreateHeroScheme } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CustomFileInterceptor } from 'src/helpers/custom-fileinterseptor';
import { Request } from 'express';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  @UseInterceptors(new CustomFileInterceptor().create())
  @UsePipes(new HeroPipe(CreateHeroScheme))
  async create(
    @Req() req: Request,
    @Body() createHeroDto: Omit<CreateHeroDto, 'img'>,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      return await this.heroService.create(createHeroDto, img.path);
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
