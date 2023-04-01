import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from './configuration/configuration.service';
import { ContentsModule } from './contents/contents.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (configurationService: ConfigurationService) => ({
        type: 'postgres',
        // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        // entities: [join('src', '**', '*.entity.{ts,js}')], // ! TODO: remove these
        url: configurationService.getDatabaseConfig().url,
        synchronize: true, // ! TODO: NO PROD => get environment from CI/CD
        autoLoadEntities: true,
      }),
    }),
    ContentsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
