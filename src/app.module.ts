import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CurrencyModule } from './currency/currency.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CurrencyModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
