import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { ListProductCommand } from './list-product.dto';

@Injectable()
export class GetProductsHandler {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async handle(payload: ListProductCommand) {
    console.log('payload: ', payload);
    const query = {
      user_id: payload.user_id,
      limit: payload.limit,
      offset: payload.page > 1 ? (payload.limit ?? 10 * (payload.page - 1)) : 0,
      page: payload.page,
    };

    return this.productRepository.listProduct(query);
  }
}
