import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto, ResponseUserDto } from '../dtos';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  async findByCredentials(username: string, password: string) {
    return this.userRepository.findOne({ password, username });
  }

  async createUser(user: CreateUserDto) {
    return plainToClass(
      ResponseUserDto,
      await this.userRepository.create(user),
    );
  }

  async getUsers() {
    return plainToClass(ResponseUserDto, await this.userRepository.findAll({}));
  }
}
