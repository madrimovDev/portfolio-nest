import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HeroModule } from './hero/hero.module';
import { ExperienceModule } from './experience/experience.module';
import { WorksModule } from './works/works.module';
import { BlogsModule } from './blogs/blogs.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    HeroModule,
    ExperienceModule,
    WorksModule,
    BlogsModule,
    LikesModule,
    CommentsModule,
    ApiModule,
  ],
  providers: [PrismaService],
  exports: [PrismaModule],
  controllers: [],
})
export class AppModule {}
