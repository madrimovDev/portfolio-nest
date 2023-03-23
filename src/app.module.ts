import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HeroModule } from './hero/hero.module';
import { ExperienceModule } from './experience/experience.module';
import { WorksModule } from './works/works.module';

@Module({
  imports: [AuthModule, PrismaModule, HeroModule, ExperienceModule, WorksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaModule],
})
export class AppModule {}
