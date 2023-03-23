import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class BodyValidate implements PipeTransform {
  constructor(private readonly scheme: ObjectSchema) {}
  transform(value: any) {
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
}
