import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { BioService } from './bio.service';
import { BioController } from './bio.controller';

@Module({
  controllers: [BioController],
  providers: [BioService, PrismaService],
})
export class BioModule {}
