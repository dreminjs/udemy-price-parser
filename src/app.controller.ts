import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:courseName')
  async findPrice(@Param('courseName') courseName: string): Promise<{
    title?: string;
    price?: string;
    currency?: string;
  }> {
    return this.appService.findPrice(courseName);
  }
}
