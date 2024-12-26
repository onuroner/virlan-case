import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './model/Product';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ingest')
  async ingestData(@Body() data: Product): Promise<string> {
    return this.appService.ingest(data); 
  }

  @Get('search')
  async searchData(@Query('q') query: string): Promise<any> {
    return this.appService.search(query); 
  }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
}
