import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get()
  async findAll(): Promise<any> {
    return this.locationService.findAll();
  }

  @Get(':city')
  async getOne(@Param('city') city: string): Promise<any> {
    return this.locationService.findLocationPage(city);
  }


}
