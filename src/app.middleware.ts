import { AuthService } from './auth/auth.service';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const METHOD = req.method;

      if (METHOD === 'GET') {
        return next();
      }
      const token = req.cookies['token'];
      if (!token) {
        throw new UnauthorizedException();
      }
      const admin = await this.authService.verifyToken(token);

      if (!admin) {
        throw new UnauthorizedException();
      }

      next();
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
