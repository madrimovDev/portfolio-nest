import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class HeroPipe implements PipeTransform {
  constructor(private scheme: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const result = this.scheme.validate(value);
      if (result.error) {
        const errorMessage = result.error.details.map((d) => ({
          message: d.message,
          path: d.path,
        }));
        throw new BadRequestException(errorMessage);
      }
      return result.value;
    }
    return value;
  }
}
