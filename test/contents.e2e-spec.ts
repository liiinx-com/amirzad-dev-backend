import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContentsModule } from '../src/contents/contents.module';
import { ContentsService } from '../src/contents/contents.service';
import { Content, ContentTypes } from '../src/contents/entities/content.entity';

describe('ContentController (e2e)', () => {
  let app: INestApplication;

  const mockContentRepository = {};
  const mockContentService = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ContentsModule],
    })
      .overrideProvider(ContentsService)
      .useValue(mockContentService)
      .overrideProvider(getRepositoryToken(Content))
      .useValue(mockContentRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) returns 404 without content-type querystring', () => {
    return request(app.getHttpServer()).get('/contents').expect(400);
  });

  // TODO: fix test
  xit('/ (GET) returns list of content-type based on the provided querystring', () => {
    return request(app.getHttpServer())
      .get('/contents?content-types=ABOUT')
      .expect(200);
  });

  // TODO: fix test
  xit('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/contents')
      .send({
        contentType: ContentTypes.ABOUT,
        content: 'SAMPLE_CONTENT_GOES_HERE',
        title: 'SAMPLE_TITLE',
      })
      .expect(203);
  });
});
