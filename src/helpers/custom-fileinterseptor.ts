import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const fileName = (value: string): string => {
  const uid = uuid().split('-').at(0);
  return `${value}-${uid}.`;
};

@Injectable()
export class CustomFileInterceptor {
  constructor(private readonly options: MulterOptions = {}) {}

  public create(): ReturnType<typeof FileInterceptor> {
    return FileInterceptor('img', {
      storage: diskStorage({
        destination: this.options.dest || './uploads',
        filename: (
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const title = fileName(req.body.title);
          const format = file.originalname.split('.').at(-1);
          const filename = title + format;
          callback(null, filename);
        },
      }),
      ...this.options,
    });
  }
}
