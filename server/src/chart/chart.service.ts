import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chart, ChartDocument } from './chart.schema';
import { CreateChartDto } from './dto/create-chart.dto';

@Injectable()
export class ChartService {
  constructor(@InjectModel(Chart.name) private chartModel: Model<ChartDocument>) {}

  async create(createChartDto: CreateChartDto): Promise<Chart> {
    // Validate data arrays have same length
    if (createChartDto.xData.length !== createChartDto.yData.length) {
      throw new BadRequestException('xData and yData must have the same length');
    }

    const createdChart = new this.chartModel({
      ...createChartDto,
      chartType: createChartDto.chartType || 'line',
    });
    
    return createdChart.save();
  }

  async findAll(): Promise<Chart[]> {
    return this.chartModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Chart> {
    const chart = await this.chartModel.findById(id).exec();
    if (!chart) {
      throw new NotFoundException('Chart not found');
    }
    return chart;
  }

  async update(id: string, updateChartDto: Partial<CreateChartDto>): Promise<Chart> {
    // Validate data arrays have same length if both are provided
    if (updateChartDto.xData && updateChartDto.yData && 
        updateChartDto.xData.length !== updateChartDto.yData.length) {
      throw new BadRequestException('xData and yData must have the same length');
    }

    const updatedChart = await this.chartModel
      .findByIdAndUpdate(id, updateChartDto, { new: true, runValidators: true })
      .exec();
      
    if (!updatedChart) {
      throw new NotFoundException('Chart not found');
    }
    
    return updatedChart;
  }

  async remove(id: string): Promise<Chart> {
    const deletedChart = await this.chartModel.findByIdAndDelete(id).exec();
    if (!deletedChart) {
      throw new NotFoundException('Chart not found');
    }
    return deletedChart;
  }
}