import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [HttpModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
  exports: [CurrencyService],
})
export class CurrencyModule {}
