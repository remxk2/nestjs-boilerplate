import { Module } from '@nestjs/common';
import { testDatabaseProviders } from 'src/modules/database/providers/test.provider';

@Module({
  providers: [...testDatabaseProviders],
  exports: [...testDatabaseProviders],
})
export class TestModule {}
