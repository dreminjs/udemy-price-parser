import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async index() {
    return await this.currencyService.getCurrency({
      baseCurrency: 'EUR',
      targetCurrency: 'RUB',
    });
  }
}
