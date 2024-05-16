// tile.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TopProduct extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  canada: boolean;
  @Prop({ required: true })
  url: string;
}

export const TopProductSchema = SchemaFactory.createForClass(TopProduct);
