import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Services } from 'src/schemas/services.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Services.name, 'servicesDb') private servicesModel: Model<Services>,
  ) {}

  async findAll(): Promise<any> {
    try {
      return await this.servicesModel.find().exec();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error; // or handle accordingly
    }
  }
  async findServicePage(selectedService: string): Promise<any> {
    return await this.servicesModel.find({ 'service': selectedService }).exec();
  }
}
