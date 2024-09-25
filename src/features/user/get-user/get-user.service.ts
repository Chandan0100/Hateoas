import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetProductsHandler } from 'src/features/product/list-product/list-product.service';
import { GetUserCommand } from './get-user.dto';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { GetUserHypermediaRelations } from './get-user-hypermedia-relations';
import { httpMethods } from 'src/infrastructure/common/constant';

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
      const response = new AddHypermediaLinks(user);
      return response
        .addLink(this.getUserHyperMediaRealtions.self,{
          href: `/users/?${user.uuid}`,
          method: httpMethods.GET,
        })
        .addLink(this.getUserHyperMediaRealtions.updateUser,{
          href: `/users/${user.uuid}`,
          method: httpMethods.PATCH,
        })
        .addLink(this.getUserHyperMediaRealtions.deleteUser, {
          href: `/users/${user.uuid}`,
          method: httpMethods.DELETE,
        })
    } catch (error) {
      throw error;
    }
  }
}
