import { Body, Controller, Post } from '@nestjs/common';
import { Form } from 'src/schemas/form.schema';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async create(@Body() createFormDto: Form) {
    return this.formService.create(createFormDto);
  }
}
