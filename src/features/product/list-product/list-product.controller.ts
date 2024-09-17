import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { handleError } from 'src/infrastructure/exceptions/custom-exception';
import { GetProductsHandler } from './list-product.service';
import { GetProductCommand } from './list-product.dto';

@Controller('get-products')
export class GetAllProductController {
  constructor(private readonly getProductService: GetProductsHandler) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async handle(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: GetProductCommand,
  ) {
    try {
      const response = await this.getProductService.handle(query);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log('Error during listing product details', error);
      return handleError(res, error);
    }
  }
}
