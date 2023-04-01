import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
