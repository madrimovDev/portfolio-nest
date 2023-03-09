import { UserDTO } from './dto/user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser() {
    return this.prisma.user.findFirst();
  }
  async updateUser(id: number, data: UserDTO) {
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
  }
}
