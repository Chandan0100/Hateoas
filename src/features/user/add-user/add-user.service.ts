import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';
import { AddUser } from './add-user.interface';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { AddUserHypermediaRelations } from './add-user-hypermedia-relations';

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
        method: 'GET',
      })
      .addLink(this.addUserHyperMediaRelations.deleteUser, {
        href: `users/${user.uuid}`,
        method: 'DELETE',
      })
      .addLink(this.addUserHyperMediaRelations.updateUser, {
        href: `users/${user.uuid}`,
        method: 'PATCH',
      })
      .getData();
  }
}
