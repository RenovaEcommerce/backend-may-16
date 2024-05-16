import { Controller, Get, Param } from '@nestjs/common';
import { ServiceSubService } from './servicesub.service';

@Controller('/servicesub')
export class ServiceSubController {
  constructor(private readonly servicesService: ServiceSubService) {}
  @Get()
  async findAll(): Promise<any> {
    return this.servicesService.findAll();
  }

  @Get(':selectedService')
  async getOne(
    @Param('selectedService') selectedService: string,
  ): Promise<any> {
    return this.servicesService.findServiceSubPage(selectedService);
  }
}
