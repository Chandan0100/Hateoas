import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GetProductsHandler } from './list-product.service';
import { ListProductCommand } from './list-product.dto';
import { ListProductInterceptor } from './list-product.interceptor';

@Controller()
export class ListProductController {
  constructor(private readonly getProductService: GetProductsHandler) {}

  @Get('products')
  @UseInterceptors(new ListProductInterceptor())
  @UsePipes(new ValidationPipe({ transform: true }))
  public async handle(@Query() query: ListProductCommand) {
    return this.getProductService.handle(query);
  }
}
