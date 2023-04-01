import {
  Body,
  Controller,
  ParseArrayPipe,
  HttpStatus,
  HttpException,
  Query,
  Post,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ContentResponseDto, ContentCreateDto } from './dto';
import { common } from '../utils';
import { ContentsService } from './contents.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ContentTypes } from './entities/content.entity';

@ApiTags('Contents')
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  @ApiQuery({
    name: 'content-types',
    description:
      'Available values : ABOUT, EDUCATION, SKILLS, PROJECTS, INTERESTS, WORK_EXPERIENCE',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'In case of not providing content-types',
  })
  @ApiOkResponse({
    type: ContentResponseDto,
    isArray: true,
    description: 'List of contents based of the provided Content-Type',
  })
  async getByType(
    @Query(
      'content-types',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    contentTypes: ContentTypes[],
  ): Promise<ContentResponseDto[]> {
    const requestContentTypes = contentTypes.map((c) => c.toUpperCase());
    if (!common.isSubsetOf(Object.values(ContentTypes), requestContentTypes))
      throw new HttpException('INVALID_DATA_PARTS', HttpStatus.BAD_REQUEST);

    return (await this.contentsService.findByType(contentTypes)).map(
      (c: ContentResponseDto) => new ContentResponseDto(c),
    );
  }

  @Get(':contentId')
  @ApiOkResponse({ type: ContentResponseDto, description: 'Content Details' })
  @ApiNotFoundResponse({ description: 'Content not found' })
  async getById(
    @Param('contentId', new ParseUUIDPipe()) contentId: string,
  ): Promise<ContentResponseDto> {
    const content = await this.contentsService.findOne(contentId);
    if (!content) throw new NotFoundException();

    return new ContentResponseDto(content);

    // ! TODO: heart beat for api
    // ! TODO: e2e test invalid dto for create
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    type: ContentResponseDto,
    description: 'Creates content',
  })
  async create(
    @Body() newContentDto: ContentCreateDto,
  ): Promise<ContentResponseDto> {
    return new ContentResponseDto(
      await this.contentsService.create(newContentDto),
    );
  }
}
