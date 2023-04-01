import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Content, ContentTypes } from './entities/content.entity';
import { ContentCreateDto } from './dto';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(contentDto: ContentCreateDto): Promise<Content> {
    return this.contentRepository.save(contentDto);
  }

  async findByType(contentTypes: ContentTypes[]): Promise<Content[]> {
    return this.contentRepository.find({
      where: { contentType: In(contentTypes) },
      order: {
        order: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Content | null> {
    return this.contentRepository.findOneBy({ id });
  }
}
