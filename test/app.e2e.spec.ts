import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './test.module';
import { AppController } from 'src/modules/app/controllers';
import { AppService } from 'src/modules/app/services';
import * as mongoose from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let database: typeof mongoose;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    3;

    app = moduleFixture.createNestApplication();

    database = app.get('DATABASE_CONNECTION');

    await app.init();
  });

  afterAll(async () => {
    await database.connection.close();
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
