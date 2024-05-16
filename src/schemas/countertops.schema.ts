// countertop.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Countertop extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  price_per_square_foot: number;

  @Prop({ required: true })
  thickness: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  canada: boolean;
  @Prop({ required: true })
  url: string;
}

export const CountertopSchema = SchemaFactory.createForClass(Countertop);
