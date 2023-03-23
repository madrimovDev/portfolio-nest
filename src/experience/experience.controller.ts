import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { ExperiencePipe } from './experience.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import {
  CreateExperienceDto,
  CreateExperienceScheme,
} from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async create(
    @Body(new ExperiencePipe(CreateExperienceScheme))
    createExperienceDto: CreateExperienceDto,
  ) {
    try {
      const experience = await this.experienceService.create(
        createExperienceDto,
      );
      return {
        message: 'Experience Created',
        experience,
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const experiences = await this.experienceService.findAll();
      return {
        message: 'All Experiences',
        experiences,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    try {
      const experience = await this.experienceService.update(
        +id,
        updateExperienceDto,
      );
      return {
        message: 'Updated',
        experience,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const experience = await this.experienceService.remove(+id);
      return {
        messsage: 'Deleted',
        experience,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
