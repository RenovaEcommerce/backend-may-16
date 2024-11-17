import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ strict: false }) // Disables strict mode to allow any fields
export class MovingForm extends Document {
  @Prop()
  name?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;

  @Prop({ type: [Object] }) // Allows array of objects for flexible fields like heavy items
  heavyItems?: any[];

  @Prop({ type: MongooseSchema.Types.Mixed }) // Allows any structure for arbitrary fields
  additionalData?: Record<string, any>;
}

export const MovingFormSchema = SchemaFactory.createForClass(MovingForm);
