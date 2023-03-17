import { CustomFileInterceptor } from './../interceptor/custom.fileinterceptor';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseInterceptors(new CustomFileInterceptor().create())
  async create(
    @Body() createSkillDto: CreateSkillDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const skill = await this.skillsService.create(createSkillDto, image.path);
      return {
        message: 'Created Skill',
        skill,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const skills = await this.skillsService.findAll();
      return {
        message: 'All Skills',
        skills,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  @UseInterceptors(new CustomFileInterceptor().create())
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const skill = await this.skillsService.update(
        +id,
        updateSkillDto,
        image?.path,
      );
      return {
        message: 'Updated skill',
        skill,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const skill = await this.skillsService.remove(+id);
      return {
        message: 'Deleted Skill',
        skill,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
