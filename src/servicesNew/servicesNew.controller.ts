import { Controller, Get, Param } from '@nestjs/common';
import { ServicesNewService } from './servicesNew.service';

@Controller('servicesNew')
export class ServicesNewController {
  constructor(private readonly servicesService: ServicesNewService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.servicesService.findAll();
  }

  @Get(':selectedService')
  async getOne(@Param('selectedService') selectedService: string): Promise<any> {
    return this.servicesService.findServicePage(selectedService);
  }
}