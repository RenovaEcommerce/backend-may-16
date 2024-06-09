// products-links.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductsLinks extends Document {
  @Prop({ type: [String], required: true })
  carpets: string[];

  @Prop({ type: [String], required: true })
  hardwoods: string[];

  @Prop({ type: [String], required: true })
  vinyls: string[];
  
  @Prop({ type: [String], required: true })
  tiles: string[];
  
  @Prop({ type: [String], required: true })
  sinks: string[];

  @Prop({ type: [String], required: true })
  faucets: string[];

  @Prop({ type: [String], required: true })
  vanities: string[];
}

export const ProductsLinksSchema = SchemaFactory.createForClass(ProductsLinks);
