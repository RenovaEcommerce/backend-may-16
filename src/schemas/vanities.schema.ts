import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type VanitiesDocument = Vanities & Document;

@Schema()
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
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
  filtering: string;

  @Prop({ default: null })
  color: string;

  @Prop({ default: null })
  uid: string;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  specifications: Record<string, any>;

  @Prop({ default: 0.0 })
  price: number;

  @Prop({ default: 10 })
  stock: number;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  details: Record<string, any>; // This allows `details` to be any object

  @Prop({ default: null })
  image_navigation: string;
  
  @Prop({ type: [String], default: null })
  images: string[];

  @Prop({ default: null })
  main_image: string;

  @Prop({ type: SchemaTypes.Mixed, default: {} })
  variants: Record<string, any>; // This allows `details` to be any object
}

export const VanitiesSchema = SchemaFactory.createForClass(Vanities);
