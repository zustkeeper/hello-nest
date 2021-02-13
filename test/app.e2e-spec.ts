import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Game API');
  });

  describe('/games', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/games').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/games')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/games')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'Other',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/games').expect(404);
    });
  });

  describe('/games/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/games/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/games/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/games/1')
        .send({
          title: 'Updated Test',
        })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/games/1').expect(200);
    });
  });
});
