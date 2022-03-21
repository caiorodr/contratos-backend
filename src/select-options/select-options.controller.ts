import { Controller, Get, Query } from '@nestjs/common';
import { SelectOptionsService } from './select-options.service';

@Controller('select-options')
export class SelectOptionsController {
  constructor(private readonly selectOptionsService: SelectOptionsService) {}

  @Get()
  async findAll(
    @Query ('filter') filter: any,
    @Query ('page') page: any,
    @Query ('pageSize') pageSize: any,
    @Query ('CR') cr: any,
    @Query ('pec') pec: string
  ) {
    return this.selectOptionsService.findAll(filter, page, pageSize, cr, pec);
  }


  @Get('/selectPec')
  async buscaPec() {
    return this.selectOptionsService.buscaPec();
  }

}
