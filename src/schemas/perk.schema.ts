import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Perk extends Document {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  paragraph: string;
}

export const PerkSchema = SchemaFactory.createForClass(Perk);