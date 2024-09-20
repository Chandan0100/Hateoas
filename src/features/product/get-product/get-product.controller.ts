import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { GetProductCommand } from './get-product.dto';
import { GetProductHandler } from './get-product.service';
import { GetProductInterceptor } from './get-product.interceptor';

@Controller()
export class GetProductController {
  constructor(private readonly getProductService: GetProductHandler) {}

  @Get('products/:uuid')
  @UseInterceptors(new GetProductInterceptor())
  public async handle(@Param() params: GetProductCommand) {
    const { uuid } = params;
    const data = await this.getProductService.handle(uuid);
    if (!data) throw new NotFoundException('Product not found');
    return data;
  }
}
