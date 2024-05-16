import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceSub } from 'src/schemas/service.schema';

@Injectable()
export class ServiceSubService {
  constructor(
    @InjectModel(ServiceSub.name, 'serviceSubDb') private serviceModel: Model<ServiceSub>,
  ) {}

  async findAll(): Promise<any> {
    try {
      return await this.serviceModel.find().exec();
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error; // or handle accordingly
    }
  }
  async findServiceSubPage(selectedServiceSub: string): Promise<any> {
    return await this.serviceModel.find({ 'service': selectedServiceSub }).exec();
  }
}
