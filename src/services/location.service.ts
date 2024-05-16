import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from 'src/schemas/location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name, 'locationDb') private locationModel: Model<Location>,
  ) {}

  async findAll(): Promise<any> {
    try {
      return await this.locationModel.find().exec();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error; // or handle accordingly
    }
  }
  async findLocationPage(city: string): Promise<any> {
    return await this.locationModel.find({ 'city': city }).exec();
  }
}
