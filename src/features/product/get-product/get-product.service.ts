import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetProduct } from './get-product.interface';
import halson from 'halson';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class GetProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(payload: GetProduct): Promise<any> {
    try {
      const product = await this.productRepository.getProductByUUID(
        payload.uuid,
      );
      const response = halson(product)
        .addLink('self', `/get-product?uuid=${product.uuid}`)
        .addLink('update_product', {
          href: `/update-product?uuid=${product.uuid}`,
          title: 'Dsasdas',
        } as any); //added type any as 
      // response['_links'] = {
      //   self: {
      //     href: `/get-product?uuid=${product.uuid}`,
      //   },
      //   update_product: {
      //     operation_id: 'update-product',
      //     href: `/update-product?uuid=${product.uuid}`,
      //     method: 'PUT',
      //   },
      //   delete_product: {
      //     operation_id: 'delete-product',
      //     href: `/delete-product?uuid=${product.uuid}`,
      //     method: 'DELETE',
      //   },
      // };

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
