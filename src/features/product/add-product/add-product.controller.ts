import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { AddProductHandler } from './add-product.service';
import { AddProductCommand } from './add-product.dto';
import { AddProductInterceptor } from './add-product.interceptor';

@Controller()
export class AddProductController {
  constructor(private readonly addProductService: AddProductHandler) {}

  @Post('products')
  @UseInterceptors(new AddProductInterceptor())
  public async handle(@Body() body: AddProductCommand) {
    return this.addProductService.handle(body);
  }
}
