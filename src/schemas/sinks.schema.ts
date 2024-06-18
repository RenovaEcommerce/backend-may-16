import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type SinksDocument = Sinks & Document;

@Schema()
export class Sinks {
  @Prop({ default: null })
  meta_description: string;

  @Prop({ default: null })
  meta_title: string;

  @Prop({ default: null })
  category: string;

  @Prop({ default: null })
  url: string;

  @Prop({ default: null })
  model: string;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  sepcifications: Record<string, any>;

  @Prop({ default: null })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: null })
  description: string;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  details: Record<string, any>; // This allows `details` to be any object

  @Prop({ type: [String], default: null })
  images: string[];

  @Prop({ type: [{ color_name: String, image_url: String }], default: null })
  variants: { color_name: string; image_url: string }[];
}

export const SinksSchema = SchemaFactory.createForClass(Sinks);
