import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { ContentCreateDto } from './dto';
import { ContentTypes } from './entities/content.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('ContentsController', () => {
  let controller: ContentsController;

  const mockContentService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [ContentsService],
    })
      .overrideProvider(ContentsService)
      .useValue(mockContentService)
      .compile();

    controller = module.get<ContentsController>(ContentsController);
  });

  describe('DTO validation', () => {
    it('should fail on invalid CreateContentDto object', async () => {
      const createContentReqDto: any = {
        content: 'MIN',
        title: 'MIN',
      };
      const dtoObject = plainToInstance(ContentCreateDto, createContentReqDto);
      const errors = await validate(dtoObject);
      expect(errors.length).toBe(3);
    });

    it('should pass on minimal CreateContentDto object', async () => {
      const createContentReqDto: Partial<ContentCreateDto> = {
        contentType: ContentTypes.ABOUT,
        content: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
        title: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
      };
      const dtoObject = plainToInstance(ContentCreateDto, createContentReqDto);
      const errors = await validate(dtoObject);
      expect(errors.length).toBe(0);
    });

    it('should fail on empty tags array of CreateContentDto object', async () => {
      const createContentReqDto: ContentCreateDto = {
        contentType: ContentTypes.ABOUT,
        content: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
        title: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
        subtitle: 'SUBTITLE',
        secondarySubtitle: 'SECONDARY_SUBTITLE',
        from: new Date(),
        to: new Date(),
        iconName: 'ICON_NAME',
        imageUrl: 'IMAGE_URL',
        videoUrl: 'VIDEO_URL',
        order: 1,
        rating: 1,
        tags: [],
      };

      const dtoObject = plainToInstance(ContentCreateDto, createContentReqDto);
      const errors = await validate(dtoObject);
      expect(errors.length).toBe(1);
    });

    it('should pass on complete CreateContentDto object', async () => {
      const createContentReqDto: ContentCreateDto = {
        contentType: ContentTypes.ABOUT,
        content: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
        title: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
        subtitle: 'SUBTITLE',
        secondarySubtitle: 'SECONDARY_SUBTITLE',
        from: new Date(),
        to: new Date(),
        iconName: 'ICON_NAME',
        imageUrl: 'IMAGE_URL',
        videoUrl: 'VIDEO_URL',
        order: 1,
        rating: 1,
        tags: ['TAG1', 'TAG2'],
      };

      const dtoObject = plainToInstance(ContentCreateDto, createContentReqDto);
      const errors = await validate(dtoObject);
      console.log('errors', errors);
      expect(errors.length).toBe(0);
    });
  });

  // it('should create a about content', async () => {
  //   // Arrange
  //   const createContentReqDto: Partial<CreateContentDto> = {
  //     contentType: ContentTypes.ABOUT,
  //     content: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
  //     title: 'THIS_CONTENT_IS_LONGER_THAN_MIN_OF_5',
  //     from: new Date(),
  //   };

  //   // Act
  //   const response = await controller.create(createContentReqDto);

  //   // Assert
  //   console.log('response', response);

  //   expect(controller).toBeDefined();
  // });
});
