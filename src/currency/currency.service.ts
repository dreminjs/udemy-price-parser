import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getCurrency({
    baseCurrency,
    targetCurrency,
  }: {
    baseCurrency: 'EUR' | 'USD' | 'RUB';
    targetCurrency: 'EUR' | 'USD' | 'RUB';
  }): Promise<number> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://v6.exchangerate-api.com/v6/${this.configService.get('API_KEY')}/latest/${baseCurrency}`,
        ),
      );
      return response.data['conversion_rates'][`${targetCurrency}`];
    } catch (error) {
      console.error('Error fetching currency data:', error);
      throw new Error('Failed to fetch currency data');
    }
  }
}
