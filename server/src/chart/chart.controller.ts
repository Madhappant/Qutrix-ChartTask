import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChartService } from './chart.service';
import { CreateChartDto } from './dto/create-chart.dto';

@Controller('datasets')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Post()
  async create(@Body() createChartDto: CreateChartDto) {
    try {
      const chart = await this.chartService.create(createChartDto);
      return {
        success: true,
        data: chart,
        message: 'Dataset created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error creating dataset',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const charts = await this.chartService.findAll();
      return {
        success: true,
        data: charts,
        message: 'Datasets retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error retrieving datasets',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const chart = await this.chartService.findOne(id);
      return {
        success: true,
        data: chart,
        message: 'Dataset retrieved successfully',
      };
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error retrieving dataset',
          error: error.message,
        },
        status,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateChartDto: Partial<CreateChartDto>) {
    try {
      const chart = await this.chartService.update(id, updateChartDto);
      return {
        success: true,
        data: chart,
        message: 'Dataset updated successfully',
      };
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error updating dataset',
          error: error.message,
        },
        status,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const chart = await this.chartService.remove(id);
      return {
        success: true,
        data: chart,
        message: 'Dataset deleted successfully',
      };
    } catch (error) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error deleting dataset',
          error: error.message,
        },
        status,
      );
    }
  }
}