import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { UserLoginDto } from '../dtos';
import { Validation } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/modules/user/dtos';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Validation()
  async login(@Body() user_login: UserLoginDto) {
    return this.authService.login(user_login);
  }

  @Post('/register')
  @Validation()
  async register(@Body() user_data: CreateUserDto) {
    return this.authService.register(user_data);
  }
}
