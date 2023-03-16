import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validate(username: string, pass: string) {
    const user = await this.prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    const token = this.jwt.sign({ username });
    const refresh = this.jwt.sign(user, {
      expiresIn: '48h',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return {
      ...result,
      token,
      refresh,
    };
  }

  async verifyToken(token: string): Promise<{ [key: string]: any }> {
    try {
      const payload = this.jwt.verify(token, {
        secret: 'SECRET',
      }) as { username: string; exp?: number };

      const user = await this.prisma.admin.findUnique({
        where: {
          username: payload.username,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const now = Math.floor(Date.now() / 1000); // Convert to seconds
      if (payload.exp && now > payload.exp) {
        // Token has expired
        throw new UnauthorizedException('Token has expired');
      }

      const newToken = await this.jwt.signAsync({ username: user.username });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return {
        ...result,
        newToken,
      };
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwt.verify(refreshToken, {
        secret: 'REFRESH_SECRET',
      });

      const user = await this.prisma.admin.findUnique({
        where: {
          username: payload.username,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const token = this.jwt.sign(user);
      const newRefreshToken = this.jwt.sign(user, {
        expiresIn: '48h',
        secret: 'REFRESH_SECRET',
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return {
        ...result,
        token,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      console.log(err.name);
      throw new UnauthorizedException();
    }
  }
}
