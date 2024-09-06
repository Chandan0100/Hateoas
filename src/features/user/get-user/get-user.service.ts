import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetUser } from './get-user.interface';
import { GetProductsHandler } from 'src/features/product/list-product/list-product.service';

@Injectable()
export class GetUserServiceHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productService: GetProductsHandler,
  ) {}

  public async handle(payload: GetUser) {
    try {
      const user = await this.userRepository.getUserByUUID(payload.uuid);
      if (!user) return;
      const products = await this.productService.handle({
        user_id: user.uuid,
      });

      const response = user;
      response['_links'] = {
        self: {
          href: `/get-user/?${user.uuid}`,
        },
        update_user: {
          operation_id: 'update-user',
          href: `/update-user?${user.uuid}`,
          method: 'PUT',
        },
        delete_user: {
          operation_id: 'delete-user',
          href: `/delete-user?${user.uuid}`,
          method: 'DELETE',
        },
      };

      response['_embedded'] = {
        products: products.products,
        add_product: products._embedded.add_product,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
