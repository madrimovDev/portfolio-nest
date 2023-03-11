import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BioModule } from './bio/bio.module';
import { SkillsModule } from './skills/skills.module';
import { BlogsModule } from './blogs/blogs.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [UserModule, BioModule, SkillsModule, BlogsModule, LikesModule],
  controllers: [AppController],
})
export class AppModule {}
