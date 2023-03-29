import { Body, Controller, Post, Get, HttpCode } from '@nestjs/common';
import { CreateContentDto } from './dto';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async list(): Promise<string> {
    console.log('listContentDto');
    // TODO: based on content-type return a dto
    return 'list contents';
  }

  @Post()
  @HttpCode(203)
  async create(@Body() createContentDto: CreateContentDto): Promise<string> {
    console.log('createContentDto', createContentDto);
    return 'based on content-type return a dto';
  }
}
