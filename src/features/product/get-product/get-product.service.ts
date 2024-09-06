import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetProduct } from './get-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class GetProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(payload: GetProduct) {
    try {
      const product = await this.productRepository.getProductByUUID(
        payload.uuid,
      );
      const response = product;
      response['_links'] = {
        self: {
          href: `/get-product?uuid=${product.uuid}`,
        },
        update_product: {
          operation_id: 'update-product',
          href: `/update-product?uuid=${product.uuid}`,
          method: 'PUT',
        },
        delete_product: {
          operation_id: 'delete-product',
          href: `/delete-product?uuid=${product.uuid}`,
          method: 'DELETE',
        },
      };

      response['_embedded'] = {
        user: {
          ...response['user'],
          _links: {
            self: {
              href: `/get-user/${response['user'].uuid}`,
            },
          },
        },
      };

      response['user'] = undefined;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
