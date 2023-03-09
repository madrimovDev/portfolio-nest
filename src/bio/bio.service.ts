import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BioDto } from './dto/bio.dto';

@Injectable()
export class BioService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.bio.findMany();
  }
  async createBio(bio: Omit<BioDto, 'id'>) {
    return await this.prisma.bio.create({
      data: bio,
    });
  }
  async updateBio(bio: Omit<BioDto, 'id'>, id: number) {
    return await this.prisma.bio.update({
      where: {
        id,
      },
      data: bio,
    });
  }
}
