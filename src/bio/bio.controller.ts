import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
  HttpStatus,
  ForbiddenException,
  UsePipes,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BioService } from './bio.service';
import { Response } from 'express';
import { BioDto, bioScheme } from './dto/bio.dto';
import { BioPipe } from './bio.pipe';

@Controller('bio')
export class BioController {
  constructor(private readonly bioService: BioService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const bios = await this.bioService.getAll();
      return res.send({
        message: 'All Bios',
        bios,
      });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  @Post()
  @UsePipes(new BioPipe(bioScheme))
  async createBio(@Res() res: Response, @Body() bioDto: Omit<BioDto, 'id'>) {
    try {
      const bio = await this.bioService.createBio(bioDto);
      return res.status(HttpStatus.CREATED).send({
        message: 'Bio Created',
        bio,
      });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  @Put(':id')
  @UsePipes(new BioPipe(bioScheme))
  async updateBio(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() bioDto: Omit<BioDto, 'id'>,
  ) {
    try {
      const bio = await this.bioService.updateBio(bioDto, id);
      return res.status(HttpStatus.OK).send({
        message: 'Bio Updated',
        bio,
      });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
