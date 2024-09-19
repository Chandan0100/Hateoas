import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetProductsHandler } from 'src/features/product/list-product/list-product.service';
import { GetUserCommand } from './get-user.dto';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { GetUserHypermediaRelations } from './get-user-hypermedia-relations';

@Injectable()
export class GetUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productService: GetProductsHandler,
    private readonly getUserHyperMediaRealtions: GetUserHypermediaRelations
  ) {}

  public async handle(params:GetUserCommand) {
    try {
      const { uuid } = params;
      const user = await this.userRepository.getUserByUUID(uuid);
      if (!user) return;
      // const products = await this.productService.handle({
      //   user_id: user.uuid,
      // });

      const response = new AddHypermediaLinks(user);
      return response
        .addLink(this.getUserHyperMediaRealtions.self,{
          href: `/users/?${user.uuid}`,
          method: 'GET',
        })
        .addLink(this.getUserHyperMediaRealtions.updateUser,{
          href: `/users/${user.uuid}`,
          method: 'PATCH',
        })
        .addLink(this.getUserHyperMediaRealtions.deleteUser, {
          href: `/users/${user.uuid}`,
          method: 'DELETE',
        })
    } catch (error) {
      throw error;
    }
  }
}
