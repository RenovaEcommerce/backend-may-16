import { Controller, Post, Body, Get } from '@nestjs/common';
import { MovingFormService } from '../services/moving-form.service';

@Controller('/moving-form')
export class MovingFormController {
  constructor(private readonly movingFormService: MovingFormService) {}

  @Post()
  async create(@Body() data: Record<string, any>) {
    return this.movingFormService.create(data);
  }

  @Get()
  async findAll() {
    return this.movingFormService.findAll();
  }
}


