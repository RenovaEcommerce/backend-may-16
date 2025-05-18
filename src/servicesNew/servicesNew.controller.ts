import { Controller, Get, Param } from '@nestjs/common';
import { ServicesNewService } from './servicesNew.service';

@Controller('servicesNew')
export class ServicesNewController {
  constructor(private readonly servicesNewService: ServicesNewService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.servicesNewService.findAll();
  }

  @Get(':selectedService')
  async getOne(@Param('selectedService') selectedService: string): Promise<any> {
    return this.servicesNewService.findServicePage(selectedService);
  }
}
