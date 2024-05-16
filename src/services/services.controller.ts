import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Get()
  async findAll(): Promise<any> {
    return this.servicesService.findAll();
  }

  @Get(':selectedService')
  async getOne(@Param('selectedService') selectedService: string): Promise<any> {
    return this.servicesService.findServicePage(selectedService);
  }


}
