import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarpetDocument = Carpet & Document;

@Schema()
export class Carpet {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  style: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  collection: string;

  @Prop({ required: true })
  fiber: string;

  @Prop({ required: true })
  fiber_brand: string;

  @Prop({ required: true })
  width: string;

  @Prop({ required: true })
  style_type: string;

  @Prop({ required: true })
  face_weight: string;

  @Prop({ required: true })
  stain_treatment: string;

  @Prop({ required: true })
  backing: string;

  @Prop({ required: true })
  usa: boolean;

  @Prop({ required: true })
  country_of_origin: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: [{ url: String, image: String }] })
  variants: Record<string, any>[];
}

export const CarpetSchema = SchemaFactory.createForClass(Carpet);
