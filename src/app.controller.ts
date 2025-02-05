import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to the E-Commerce API!';
  }

  @Get('health')
  getHealth(): string {
    return 'API is up and running!';
  }
}