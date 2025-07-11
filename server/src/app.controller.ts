import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return {
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    };
  }
}