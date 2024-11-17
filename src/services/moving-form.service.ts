import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovingForm } from 'src/schemas/moving-form.schema';

@Injectable()
export class MovingFormService {
  constructor(
    @InjectModel(MovingForm.name, 'movingFormDb') // Use the connection name
    private readonly movingFormModel: Model<MovingForm>,
  ) {}

  async create(data: Partial<MovingForm>) {
    const createdForm = new this.movingFormModel(data);
    return createdForm.save();
  }

  async findAll() {
    return this.movingFormModel.find().exec();
  }
}
