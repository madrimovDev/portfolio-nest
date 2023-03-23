import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';

@Module({
  imports: [PrismaModule],
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
