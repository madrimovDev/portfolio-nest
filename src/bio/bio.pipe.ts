import { BadRequestException } from '@nestjs/common';
import { Injectable, PipeTransform } from '@nestjs/common';
import { bioScheme } from './dto/bio.dto';

@Injectable()
export class BioPipe implements PipeTransform {
  constructor(private schema: typeof bioScheme) {}
  public transform(value: any) {
    const result = this.schema.validate(value);
    if (typeof value !== 'object') return value;
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
