import { Injectable } from '@nestjs/common';
import { LoginResponseDto, UserLoginDto } from '../dtos';
import { UserService } from '../../user/services';
import { JwtService } from '@nestjs/jwt';
import { UserNotFound } from 'src/exceptions';
import { CreateUserDto } from 'src/modules/user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  async login(user_login: UserLoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByCredentials(
      user_login.username,
      user_login.password,
    );

    if (!user) throw new UserNotFound();

    const payload = { email: user.email, username: user.username };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      expiries_in: 60,
    };
  }
}
