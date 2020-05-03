import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { AppService } from './services';
import { AuthModule } from '../auth';
import { UserModule } from '../user';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
