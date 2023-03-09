import { UsePipes } from '@nestjs/common';
import { UserDTO, userScheme } from './dto/user.dto';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Res,
  HttpStatus,
  HttpException,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserPipe } from './user.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUser(@Res() res: Response) {
    try {
      const user = await this.userService.getUser();
      return res.send({
        user,
        message: 'User',
      });
    } catch (error) {
      return new HttpException('User Not Found', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  @Put(':id')
  @UsePipes(new UserPipe(userScheme))
  async updateUser(
    @Res() res: Response,
    @Body() userDto: UserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const user = await this.userService.updateUser(id, userDto);
      return res.send({
        user,
        message: 'User updated',
      });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).send(
        new HttpException('User Not Found', HttpStatus.FORBIDDEN, {
          cause: error,
        }),
      );
    }
  }
}
