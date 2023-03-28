import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiInfo, PostgresConfig } from './configuration.interface';
import { API_NAME, POSTGRES_URL } from './constants';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  getApiInfo(): ApiInfo {
    return {
      name: this.configService.get<string>(API_NAME),
    };
  }

  getPostgresConfig(): PostgresConfig {
    return { url: this.configService.get<string>(POSTGRES_URL) };
  }
}
