import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ConfigurationModule],
  controllers: [AppController],
})
export class AppModule {}
