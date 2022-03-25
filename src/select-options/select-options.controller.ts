/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { SelectOptionsService } from './select-options.service';

@Controller('select-options')
export class SelectOptionsController {
  constructor(private readonly selectOptionsService: SelectOptionsService) {}

  @Get('/findPec')
  async findPec(
    @Query ('filter') filter: any,
    @Query ('page') page: any,
    @Query ('pageSize') pageSize: any
  ) {
    return this.selectOptionsService.findPec(filter, page, pageSize);
  }

  @Get('/findCr')
  async findCr(
    @Query ('pec') pec: any,
  ) {
    return this.selectOptionsService.findCr(pec);
  }

}
