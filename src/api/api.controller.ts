import { Controller, Get } from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service';
import { ExperienceService } from 'src/experience/experience.service';
import { HeroService } from 'src/hero/hero.service';
import { WorksService } from 'src/works/works.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly hero: HeroService,
    private readonly experience: ExperienceService,
    private readonly blogs: BlogsService,
    private readonly works: WorksService,
  ) {}

  @Get()
  async getAll() {
    const hero = await this.hero.findAll();
    const experience = await this.experience.findAll();
    const blogs = await this.blogs.findAll();
    const works = await this.works.findAll();
    return {
      message: 'All Data',
      data: {
        hero,
        experience,
        blogs,
        works,
      },
    };
  }
}
