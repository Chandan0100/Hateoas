import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { DeleteProductServiceHandler } from './delete-product.service';
import { DeleteProductCommand } from './delete-product.dto';
import { DeleteProductInterceptor } from './delete-product.interceptor';

@Controller()
export class DeleteProductController {
  constructor(
    private readonly deleteProductService: DeleteProductServiceHandler,
  ) {}

  @Delete('products/:uuid')
  @UseInterceptors(new DeleteProductInterceptor())
  public async handle(@Param() params: DeleteProductCommand) {
    const { uuid } = params;
    const { affected } = await this.deleteProductService.handle(uuid);
    if (!affected) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }
}
