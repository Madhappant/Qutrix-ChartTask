import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChartModule } from './chart/chart.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dhanushmass371:mass123@chart0.0rfacfz.mongodb.net/chartplotter'),
    ChartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}