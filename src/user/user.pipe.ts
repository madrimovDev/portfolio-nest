import { UserDTO, userScheme } from './dto/user.dto';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private schema: typeof userScheme) {}
  public transform(value: any): UserDTO {
    const result = this.schema.validate(value);
    if (typeof value !== 'object') return value;
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
