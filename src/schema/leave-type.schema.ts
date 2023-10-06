import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class LeaveType {
  @Prop({ required: true })
  name: string;
  @Prop({ default: true })
  status: boolean;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type LeaveTypeDocument = LeaveType & Document;
export const LeaveTypeSchema = SchemaFactory.createForClass(LeaveType);
