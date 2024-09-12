import { Injectable } from '@nestjs/common';
import { GetProduct } from './list-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { AddProductLinkService } from '../get-product/addproductLink.link';

@Injectable()
export class GetProductsHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(payload: GetProduct) {
    try {
      const query = { ...payload };
      query.limit = payload.limit ?? 10;
      query.page = payload.page ? payload.limit * (payload.page - 1) : 0;
      const product = await this.productRepository.getAllProduct(payload);

      const response = new AddProductLinkService({ product : ...product[0] });

      return response
        .addEmbedded(
          {
            field: 'product',
            rel: 'self',
          },
          {
            href: `/get-product`,
            append: 'uuid',
          },
        )
        .getData();
      // const response = {
      //   total: product[1],
      //   ...(!payload.user_id && {
      //     _links: {
      //       self: {
      //         href: `/get-products?page=${payload.page ?? 1}&limit=${payload.limit ?? 10}`,
      //       },
      //       first: {
      //         href: `/get-products?page=1&limit=${payload.limit ?? 10}`,
      //       },
      //       ...(payload.page &&
      //         payload.page > 1 && {
      //           prev: {
      //             href: `/get-products?page=${Number(payload.page) - 1}&limit=${payload.limit ?? 10}`,
      //           },
      //         }),
      //       ...(payload.page &&
      //         Math.ceil(product[1] / Number(payload.limit ?? 10)) !==
      //           Number(payload.page) && {
      //           next: {
      //             href: `/get-products?page=${Number(payload.page) + 1}&limit=${payload.limit ?? 10}`,
      //           },
      //         }),
      //       last: {
      //         href: `/get-products?page=${Math.ceil(product[1] / Number(payload.limit))}&limit=${payload.limit ?? 10}`,
      //       },
      //       get_page: {
      //         href: `/get-products{?page,limit,user_id}`,
      //         templated: true,
      //       },
      //     },
      //   }),
      //   products: undefined,
      //   _embedded: {
      //     products: product[0].map((product) => ({
      //       ...product,
      //       _link: {
      //         self: {
      //           href: `/get-product/${product.uuid}`,
      //         },
      //       },
      //     })),
      //     add_product: {
      //       title: 'add-product',
      //       href: '/add-product',
      //       method: 'POST',
      //     },
      //   },
      // };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
