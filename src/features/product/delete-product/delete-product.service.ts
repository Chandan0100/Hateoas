import { Injectable } from '@nestjs/common';

import { DeleteProduct } from './delete-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class DeleteProductServiceHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(obj: DeleteProduct ) {
    try {
      const product = await this.productRepository.deleteProductByUUID(obj.uuid);
      const response = product;
      response['_links'] = {
        self: ``,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
