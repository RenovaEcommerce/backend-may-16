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

  @Prop({ type: [String], required: true })
  doors: string[];

  @Prop({ type: [String], required: true })
  countertops: string[];

  @Prop({ type: [String], required: true })
  laminates: string[];
}

export const ProductsLinksSchema = SchemaFactory.createForClass(ProductsLinks);

// Pre-save hook to remove duplicates
ProductsLinksSchema.pre('save', function (next) {
  this.carpets = [...new Set(this.carpets)];
  this.hardwoods = [...new Set(this.hardwoods)];
  this.vinyls = [...new Set(this.vinyls)];
  this.tiles = [...new Set(this.tiles)];
  this.sinks = [...new Set(this.sinks)];
  this.faucets = [...new Set(this.faucets)];
  this.vanities = [...new Set(this.vanities)];
  this.doors = [...new Set(this.doors)];
  this.countertops = [...new Set(this.countertops)];
  this.laminates = [...new Set(this.laminates)];
  next();
});