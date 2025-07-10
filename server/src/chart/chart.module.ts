import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { Chart, ChartSchema } from './chart.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chart.name, schema: ChartSchema }])],
  controllers: [ChartController],
  providers: [ChartService],
})
export class ChartModule {}