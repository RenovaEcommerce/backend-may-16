// src/schemas/your.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Form extends Document {
 
    @Prop({ trim: true })
    name: string;
  
  
    
    @Prop({ trim: true })
    number?: string;
  
  
  
    @Prop({ trim: true })
    comments?: string;
  
    /* @Prop()
    selection: any; */
    
    @Prop({ type: [Object] }) // Define further if file structure is needed
    files: any[];
}

export const FormSchema = SchemaFactory.createForClass(Form);