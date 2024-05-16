// src/your/your.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from 'src/schemas/form.schema';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name, 'requestFormDb') private formModel: Model<Form>,
  ) {}

  async create(createYourDto: Form): Promise<Form> {
    const createdForm = new this.formModel(createYourDto);
    return createdForm.save();
  }
}
