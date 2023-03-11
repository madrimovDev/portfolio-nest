import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return this.prisma.skills.findMany();
  }
  async createSkills() {
    return;
  }
}
