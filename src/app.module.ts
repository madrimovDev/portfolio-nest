import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BioModule } from './bio/bio.module';
import { SkillsModule } from './skills/skills.module';
import { BlogsModule } from './blogs/blogs.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './app.middleware';
import { BlogsController } from './blogs/blogs.controller';
import { BioController } from './bio/bio.controller';
import { UserController } from './user/user.controller';
import { SkillsController } from './skills/skills.controller';

@Module({
  imports: [
    UserModule,
    BioModule,
    SkillsModule,
    BlogsModule,
    LikesModule,
    CommentsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        BlogsController,
        BioController,
        UserController,
        SkillsController,
      );
  }
}
