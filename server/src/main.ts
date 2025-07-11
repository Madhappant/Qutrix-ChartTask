import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['https://qutrix-chart-task.vercel.app/', 'https://qutrix-charttask.onrender.com/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  await app.listen(3001);
  console.log('Server is running on https://qutrix-charttask.onrender.com');
}
bootstrap();