import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class CustomFileInterceptor {
  constructor(private readonly options: MulterOptions = {}) {}

  public create(): ReturnType<typeof FileInterceptor> {
    return FileInterceptor('image', {
      storage: diskStorage({
        destination: this.options.dest || './uploads',
        filename: (
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) => {
          const title = (req.body.name +
            '-' +
            uuid().split('-').at(0)) as string;
          const format = file.originalname.split('.').at(-1);
          const filename =
            title.split(' ').filter(Boolean).join('-') + '.' + format;
          callback(null, filename);
        },
      }),
      ...this.options,
    });
  }
}
