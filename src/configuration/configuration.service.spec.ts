import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration.service';
import { ConfigService } from '@nestjs/config';
import { API_NAME, POSTGRES_URL } from './constants';

describe('ConfigurationService', () => {
  let configService: ConfigurationService;

  const mockConfigService = {
    get: jest.fn((configKey: string) => `${configKey}_VALUE`),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurationService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    configService = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should get all available config values', () => {
    const availableConfigKeys = {
      [API_NAME]: () => configService.getApiInfo().name,
      [POSTGRES_URL]: () => configService.getPostgresConfig().url,
    };
    let timesCalled = 0;
    for (const key in availableConfigKeys) {
      expect(availableConfigKeys[key]()).toEqual(`${key}_VALUE`);
      expect(mockConfigService.get).toBeCalledWith(key);
      timesCalled++;
    }
    expect(mockConfigService.get).toHaveBeenCalledTimes(timesCalled);
  });
});
