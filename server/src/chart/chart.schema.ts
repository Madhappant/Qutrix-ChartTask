import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChartDocument = Chart & Document;

@Schema({ timestamps: true })
export class Chart {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true, type: [Number] })
  xData: number[];

  @Prop({ required: true, type: [Number] })
  yData: number[];

  @Prop({ required: true, enum: ['line', 'bar', 'scatter'], default: 'line' })
  chartType: string;
}

export const ChartSchema = SchemaFactory.createForClass(Chart);

// Add validation middleware
ChartSchema.pre('save', function(next) {
  if (this.xData.length !== this.yData.length) {
    next(new Error('xData and yData must have the same length'));
  } else {
    next();
  }
});