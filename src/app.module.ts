import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BioModule } from './bio/bio.module';

@Module({
  imports: [UserModule, BioModule],
  controllers: [AppController],
})
export class AppModule {}
