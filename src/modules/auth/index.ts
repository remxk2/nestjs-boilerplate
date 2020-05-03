import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { AuthService } from './services';
import { AuthController } from './controllers';
import { UserModule } from '../user';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.SECRET_KEY,
      signOptions: { expiresIn: config.EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
