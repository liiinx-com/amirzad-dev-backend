import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API Info')
@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Backend Service';
  }
}
