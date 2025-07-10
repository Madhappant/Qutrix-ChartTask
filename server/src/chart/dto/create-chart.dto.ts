import { IsString, IsArray, IsEnum, IsOptional, ArrayMinSize } from 'class-validator';

export class CreateChartDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  xData: number[];

  @IsArray()
  @ArrayMinSize(1)
  yData: number[];

  @IsOptional()
  @IsEnum(['line', 'bar', 'scatter'])
  chartType?: string;
}