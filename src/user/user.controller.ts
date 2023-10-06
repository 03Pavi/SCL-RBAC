import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Headers,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

export type loginDto = {
  name: string;
  password: string;
};
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async check(
    @Body() userData: loginDto,
    @Headers() headers: any,
    @Res() res: Response,
  ) {
    const AccessToken = await this.userService.check(userData);
    res.setHeader('authorization', `${AccessToken}`);
    res.json({
      AccessToken,
      message: 'Login successful',
    });
  }
}
