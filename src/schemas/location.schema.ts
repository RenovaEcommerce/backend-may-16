
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Perk } from './perk.schema'; // Make sure to import Perk schema

@Schema()
export class Location extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  h1: string;

  @Prop({ required: true })
  heroH2: string;

  @Prop({ required: true })
  heroP: string;

  @Prop({ required: true })
  sectionH2: string;

  @Prop({ required: true })
  sectionP1: string;

  @Prop({ required: true })
  sectionP2: string;

  @Prop({ required: true })
  section2H2: string;

  @Prop({ required: true })
  section2P1: string;

  @Prop({ required: true })
  section2P2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  service: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Perk' }] })
  perks: Perk[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Perk' }] })
  faqItems: Perk[];

  @Prop({ required: true })
  markdown: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
