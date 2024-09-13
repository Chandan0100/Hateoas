import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { AddProductLinkService } from './add-product-Link';

@Injectable()
export class GetProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(uuid: string): Promise<any> {
    try {
      const product = await this.productRepository.getProductByUUID(uuid);
      const response = new AddProductLinkService(product);
      return response
        .addLink('self', `/get-product/${product.uuid}`)
        .addLink('update_product', {
          title: 'update-product',
          href: `/update-product/${product.uuid}`,
          method: 'PUT',
        })
        .addLink('delete-product', {
          title: 'delete-product',
          href: `/delete-product/${product.uuid}`,
          method: 'DELETE',
        })
        .addEmbedded(
          { field: 'user', rel: 'self' },
          `/get-user/${product['user'].uuid}`,
        )
        .getData();
    } catch (error) {
      throw error;
    }
  }
}
