import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping(@Res() res: Response) {
    res.status(HttpStatus.OK).send();
  }
}
