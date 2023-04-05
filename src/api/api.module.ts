import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { HeroService } from 'src/hero/hero.service';
import { BlogsService } from 'src/blogs/blogs.service';
import { WorksService } from 'src/works/works.service';
import { ExperienceService } from 'src/experience/experience.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HeroService, BlogsService, WorksService, ExperienceService],
  controllers: [ApiController],
})
export class ApiModule {}
