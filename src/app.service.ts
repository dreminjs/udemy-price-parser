import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import { CurrencyService } from 'src/currency/currency.service';
import { CURRENCY_NAMES } from 'src/shared';

@Injectable()
export class AppService {
  constructor(private readonly currencyService: CurrencyService) {}

  async findPrice(courseName: string): Promise<{
    title?: string;
    price?: string;
    currency?: string;
  }> {
    const browser = await chromium.launch();


    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
    });

    const page = await context.newPage();

    await page.goto(
      `https://www.udemy.com/course/${courseName}/?couponCode=NEWYEARCAREER`,
      { waitUntil: 'networkidle' },
    );

    const course = await this.currencyService.getCurrency({
      baseCurrency: CURRENCY_NAMES['€'],
      targetCurrency: 'RUB',
    });

    await page.waitForTimeout(3000);

    const res = await page.evaluate(async () => {
      const priceElement = document.querySelector(
        'div.base-price-text-module--price-part---xQlz>span+span>span',
      )?.textContent;

      if (!priceElement) {
        return 0;
      }

      const title = document.querySelector('.clp-lead__title')?.textContent;

      return {
        title,
        price: +priceElement.replace('€', ' ').replace(',', '.').trim(),
      };
    });

    return {
      ...res,
      price: res !== 0 ? String(res.price * course) : '0',
      currency: 'RUB',
    };
  }
}
