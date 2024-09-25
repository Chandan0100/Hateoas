import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';
import { AddUser } from './add-user.interface';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { AddUserHypermediaRelations } from './add-user-hypermedia-relations';
import { httpMethods } from 'src/infrastructure/common/constant';

@Injectable()
export class AddUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly addUserHyperMediaRelations: AddUserHypermediaRelations,
  ) {}

  public async handle(userPayload: AddUser) {
    const user = await this.userRepository.createUser(userPayload);
    const response = new AddHypermediaLinks(user);
    return response
      .addLink(this.addUserHyperMediaRelations.self, {
        href: `/users/${user.uuid}`,
        method: httpMethods.POST,
      })
      .addLink(this.addUserHyperMediaRelations.deleteUser, {
        href: `users/${user.uuid}`,
        method: httpMethods.DELETE,
      })
      .addLink(this.addUserHyperMediaRelations.updateUser, {
        href: `users/${user.uuid}`,
        method: httpMethods.PATCH,
      })
      .addLink(this.addUserHyperMediaRelations.getFind, {
        href: `/users/{?userId,page,limit}`,
        templated: true,
        method: httpMethods.GET,
      })
      .getData();
  }
}
