import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  metaTitle: string;

  @Prop({ required: true })
  metaDescription: string;

  @Prop({ required: true })
  markdown: string; // Markdown content

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog); // Добавьте плагин здесь
