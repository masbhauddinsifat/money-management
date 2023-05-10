import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('Should signin (POST)', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/signin')
  //     .send({ email: 'masbhauddinsifat@gmail.com', password: '123456' })
  //     .expect(200);
  // });

  it('should create expense (POST)', async () => {
    const x = await request(app.getHttpServer())
      .post('/expense')
      .send({
        description: 'fun',
        amount: 10,
        expenseDate: new Date().toISOString(),
        type: 'expense',
      })
      .expect(201);
    return x;
  });
});
