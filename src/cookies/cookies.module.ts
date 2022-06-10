import { CookiesService } from './cookies.service';
import { CookiesController } from './cookies.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [
        CookiesController,],
    providers: [
        CookiesService,],
})
export class CookiesModule { }
