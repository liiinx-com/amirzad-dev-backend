import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from './contents.service';

describe('ContentService', () => {
  let service: ContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentsService],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
  });

  xit('should be defined', () => {
    expect(service).toBeDefined();
  });
});
