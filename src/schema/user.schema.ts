import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: string;
}

export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
