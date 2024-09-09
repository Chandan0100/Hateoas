import { Injectable } from '@nestjs/common';
import { GetProduct } from './list-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';

@Injectable()
export class GetProductsHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(payload: GetProduct) {
    try {
      const query = { ...payload };
      query.limit = payload.limit ?? 10;
      query.page = payload.page ? payload.limit * (payload.page - 1) : 0;
      const product = await this.productRepository.getAllProduct(payload);
      const response = {
        total: product[1],
        ...(!payload.user_id && {
          _links: {
            self: {
              href: `/get-products?page=${payload.page ?? 1}&limit=${payload.limit ?? 10}`,
            },
            first: {
              href: `/get-products?page=1&limit=${payload.limit ?? 10}`,
            },
            ...(payload.page &&
              payload.page > 1 && {
                prev: {
                  href: `/get-products?page=${Number(payload.page) - 1}&limit=${payload.limit ?? 10}`,
                },
              }),
            ...(payload.page &&
              Math.ceil(product[1] / Number(payload.limit ?? 10)) !==
                Number(payload.page) && {
                next: {
                  href: `/get-products?page=${Number(payload.page) + 1}&limit=${payload.limit ?? 10}`,
                },
              }),
            last: {
              href: `/get-products?page=${Math.ceil(product[1] / Number(payload.limit))}&limit=${payload.limit ?? 10}`,
            },
          },
        }),
        products: product[0].map((product) => ({
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
