import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { UserRepository } from './repositories';
import { DatabaseModule } from '../database';
import { userProviders } from './providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...userProviders],
  exports: [UserService, UserRepository, ...userProviders],
})
export class UserModule {}
