import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiInfo, DatabaseConfig } from './configuration.interface';
import { API_NAME, DB_URL } from './constants';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  getApiInfo(): ApiInfo {
    return {
      name: this.configService.get<string>(API_NAME),
    };
  }

  getDatabaseConfig(): DatabaseConfig {
    return { url: this.configService.get<string>(DB_URL) };
  }
}
