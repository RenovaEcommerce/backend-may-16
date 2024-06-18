import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type VanitiesDocument = Vanities & Document;

@Schema()
export class Vanities {
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

  @Prop({ default: null })
  brand: string;

  @Prop({ default: null })
  uid: string;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  sepcifications: Record<string, any>;

  @Prop({ default: 0.0 })
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

export const VanitiesSchema = SchemaFactory.createForClass(Vanities);
