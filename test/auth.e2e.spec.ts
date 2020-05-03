import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './test.module';
import * as mongoose from 'mongoose';
import { AuthModule } from 'src/modules/auth';
import { UserModule } from 'src/modules/user';
import { internet } from 'faker';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let database: typeof mongoose;
  const credentials = {
    username: internet.userName(),
    email: internet.email(),
    password: internet.password(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule, AuthModule, UserModule],
    }).compile();
    3;

    app = moduleFixture.createNestApplication();

    database = app.get('DATABASE_CONNECTION');

    await app.init();
  });

  afterEach(async () => {
    await database.connection.close();
    await app.close();
  });

  it('Should Successfully Register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(credentials)
      .expect(201);
  });

  it('Should not login with wrong password (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: credentials.username,
        password: 'wrongpassword',
      })
      .expect(401);
  });

  it('Should successfully login (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(credentials);

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: credentials.username,
        password: credentials.password,
      })
      .expect(201);
  });
});
