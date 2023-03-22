import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  imports: [PrismaModule],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
