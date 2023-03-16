import { FileInterceptor } from '@nestjs/platform-express';
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
import { diskStorage } from 'multer';
import uuid from 'uuid';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('icon', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const title = req.body.title as string;
          const format = file.originalname.split('.').at(-1) + uuid.v4();
          const filename =
            title.split(' ').filter(Boolean).join('-') + '.' + format;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() createSkillDto: CreateSkillDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    try {
      const skill = await this.skillsService.create(createSkillDto, icon.path);

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
      throw new BadGatewayException();
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('icon', {
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const title = req.body.title as string;
          const format = file.originalname.split('.').at(-1) + uuid.v4();
          const filename =
            title.split(' ').filter(Boolean).join('-') + '.' + format;
          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    iconPath?: Express.Multer.File,
  ) {
    try {
      const skill = await this.skillsService.update(
        +id,
        updateSkillDto,
        iconPath?.path,
      );
      return {
        message: 'Updated skill',
        skill,
      };
    } catch (error) {
      throw new BadGatewayException();
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
      throw new BadGatewayException();
    }
  }
}
