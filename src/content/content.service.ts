import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content, ContentTypes } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create() {}

  async findAll(contentType: ContentTypes): Promise<Content[]> {
    return this.contentRepository.find({
      where: { contentType },
      order: {
        order: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Content | null> {
    return this.contentRepository.findOneBy({ id });
  }
}
