import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services';
import { JwtAuthGuard } from 'src/modules/auth/guards';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }
}
