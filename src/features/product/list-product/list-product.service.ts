import { Injectable } from '@nestjs/common';
import { GetProduct } from './list-product.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';

@Injectable()
export class GetProductsHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  public async handle(payload: GetProduct) {
    const query = {
      user_id: payload.user_id,
      limit: payload.limit ?? 10,
      offset: payload.page > 0 ? (payload.limit ?? 10 * (payload.page - 1)) : 0,
      page: payload.page && payload.page > 0 ? payload.page : 1,
    };

    const products = await this.productRepository.getAllProduct(query);

    const totalPages = Math.ceil(products[1] / query.limit);

    const addProductLinks = {
      products: products[0].map((product) => {
        const productWithLinks = new AddHypermediaLinks(product);
        return productWithLinks
          .addLink('self', { href: `/product/${product.uuid}` })
          .getData();
      }),
      count: products[1],
    };
    
    const response = new AddHypermediaLinks(addProductLinks);

    if (query.page < totalPages) {
      response.addLink('next', {
        href: `/get-products?page=${query.page + 1}&limit=${query.limit}`,
      });
    }

    if (query.page > 1 && products[0].length) {
      response.addLink('prev', {
        href: `/get-products?page=${query.page - 1}&limit=${query.limit}`,
      });
    }

    return response
      .addLink('self', {
        href: `/get-products?page=${query.page}&limit=${query.limit}${query.user_id ? `&user_id=${query.user_id}` : ''}`,
      })
      .addLink('first', {
        href: `/get-products?page=1&limit=${query.limit}`,
      })
      .addLink('last', {
        href: `/get-products?page=${totalPages}&limit=${query.limit}`,
      })
      .addEmbedded({ field: 'products', rel: 'products' })
      .getData();
  }
}
