/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth/login.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserModel } from 'src/app.interface';
import { GetUser } from 'src/decorators/get-user.decorator';
import { SignUpDto } from 'src/dto/auth/sign-up.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private srv: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@GetUser() user: UserModel) {
    return this.srv.login(user);
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() user: SignUpDto) {
    return this.srv.signup(user);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@GetUser() user: UserModel) {
    return this.srv.getAuthUser(user);
  }
}