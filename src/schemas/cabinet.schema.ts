// cabinet.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cabinet extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  style: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  canada: boolean;

  @Prop({required: true})
  url: string
}

export const CabinetSchema = SchemaFactory.createForClass(Cabinet);
