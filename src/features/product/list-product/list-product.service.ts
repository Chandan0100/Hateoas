import { Injectable } from '@nestjs/common';
import { GetProduct } from './list-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class GetProductsHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(payload: GetProduct) {
    try {
      const query = payload;
      query.limit = payload.limit ?? 10;
      query.page = payload.page ? payload.limit * payload.page : 0;
      const product = await this.productRepository.getAllProduct(payload);
      const response = {
        products: product.map((product) => ({
          ...product,
          _link: {
            self: {
              href: `/get-product/?uuid=${product.uuid}`,
            },
          },
        })),
        _embedded: {
          add_product: {
            operation_id: 'add-product',
            href: '/add-product',
            method: 'POST',
          },
        },
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
