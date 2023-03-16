import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() userDto: UserDto, @Res() res: Response) {
    const result = await this.authService.validate(
      userDto.username,
      userDto.password,
    );

    res.cookie('token', result.token, {
      httpOnly: true,
    });

    res.cookie('refreshToken', result.refresh, {
      httpOnly: true,
    });

    return res.status(200).send({
      message: 'Logged In',
      user: { ...result },
    });
  }

  @Get('verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['token'] as string | undefined;

    if (!token) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.verifyToken(token);
    res.cookie('token', result.newToken, {
      httpOnly: true,
    });

    return res.status(200).send({
      message: 'Verify',
      user: {
        id: result.id,
        username: result.username,
        token: result.newToken,
      },
    });
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.refreshToken(refreshToken);
    res.cookie('token', result.token, {
      httpOnly: true,
    });
    return res.status(200).send({
      message: 'Refreshed',
      user: {
        id: result.id,
        username: result.username,
        token: result.token,
      },
    });
  }
}
