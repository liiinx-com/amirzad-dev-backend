import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from './configuration/configuration.service';
import { ContentModule } from './content/content.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        url: configurationService.getDatabaseConfig().url,
        synchronize: true, // ! TODO: NO PROD => get environment from CI/CD
      }),
    }),
    ContentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
