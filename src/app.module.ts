import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HeroModule } from './hero/hero.module';
import { ExperienceModule } from './experience/experience.module';
import { WorksModule } from './works/works.module';
import { BlogsModule } from './blogs/blogs.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';

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
  ],
  controllers: [AppController],
  providers: [PrismaService],
  exports: [PrismaModule],
})
export class AppModule {}
