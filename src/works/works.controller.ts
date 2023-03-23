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
import { WorksService } from './works.service';
import { CreateWorkDto, CreateWorkScheme } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { BodyValidate } from 'src/helpers/body-validation.pipe';
import { CustomFileInterceptor } from 'src/helpers/custom-fileinterseptor';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Post()
  @UseInterceptors(new CustomFileInterceptor().create())
  async create(
    @Body(new BodyValidate(CreateWorkScheme))
    createWorkDto: Omit<CreateWorkDto, 'img'>,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      const work = await this.worksService.create(createWorkDto, img.path);
      return {
        message: 'Created',
        work,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const works = await this.worksService.findAll();
      return {
        message: 'All Works',
        works,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const work = await this.worksService.findOne(+id);
      return {
        message: 'Work',
        work,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @Patch(':id')
  @UseInterceptors(new CustomFileInterceptor().create())
  async update(
    @Param('id') id: string,
    @Body() updateWorkDto: UpdateWorkDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    try {
      const work = await this.worksService.update(
        +id,
        updateWorkDto,
        img?.path,
      );
      return {
        message: 'Updated',
        work,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const work = await this.worksService.remove(+id);
      return {
        message: 'Deleted',
        work,
      };
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
