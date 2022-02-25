import { Controller, Get } from '@nestjs/common';
import { SelectOptionsService } from './select-options.service';

@Controller('select-options')
export class SelectOptionsController {
  constructor(private readonly selectOptionsService: SelectOptionsService) {}

  @Get()
  async findAll() {
    return this.selectOptionsService.findAll();
  }
}
