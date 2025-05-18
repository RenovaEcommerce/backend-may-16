import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServicesNew } from 'src/schemas/servicesNew.schema';

@Injectable()
export class ServicesNewService {
  constructor(
    @InjectModel(ServicesNew.name, 'servicesNewDb') private servicesNewModel: Model<ServicesNew>,
  ) {}

  async findAll(): Promise<any> {
    try {
      return await this.servicesNewModel.find().exec();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  async findServicePage(selectedService: string): Promise<any> {
    try {
      return await this.servicesNewModel.find({ service: selectedService }).exec();
    } catch (error) {
      console.error('Error finding service page:', error);
      throw error;
    }
  }
}