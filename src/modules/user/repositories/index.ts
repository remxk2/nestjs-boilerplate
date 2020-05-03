import { Model, MongooseFilterQuery } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../interfaces';
import { CreateUserDto } from '../dtos';
import { ObjectID } from 'mongodb';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(create_user_dto: CreateUserDto) {
    return this.userModel.create(create_user_dto);
  }

  async findAll(query: MongooseFilterQuery<User>) {
    return this.userModel.find(query);
  }

  async findById(user_id: ObjectID) {
    return this.userModel.findById(user_id);
  }

  async findOne(query: MongooseFilterQuery<User>) {
    return this.userModel.findOne(query);
  }
}
