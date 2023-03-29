import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContentModule } from '../src/content/content.module';
import { ContentService } from '../src/content/content.service';
import { Content } from '../src/content/entities/content.entity';

describe('ContentController (e2e)', () => {
  let app: INestApplication;

  const mockContentRepository = {};
  const mockContentService = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ContentModule],
    })
      .overrideProvider(ContentService)
      .useValue(mockContentService)
      .overrideProvider(getRepositoryToken(Content))
      .useValue(mockContentRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/content')
      .expect(200)
      .expect('list contents');
  });

  xit('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/content')
      .send({
        // contentType: ContentTypes.ABOUT,
        content: 'SAMPLE_CONTENT_GOES_HERE',
        // title: 'SAMPLE_TITLE',
        title: 'SAM',
      })
      .expect(203);
  });
});
