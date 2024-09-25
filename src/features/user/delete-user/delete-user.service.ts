import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { DeleteUserHypermediaRelations } from './delete-user-hypermedia-relations';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { httpMethods } from 'src/infrastructure/common/constant';

@Injectable()
export class DeleteUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly deleteUserHypermediaRelations: DeleteUserHypermediaRelations
  ) {}

  public async handle(uuid: string) {
    const user = await this.userRepository.deleteUserByUuid(uuid);
    const response =  new AddHypermediaLinks(user);
    return response
      .addLink(this.deleteUserHypermediaRelations.self, {
        href: `/users/?${uuid}`,
        method: httpMethods.DELETE,
      })
      .addLink(this.deleteUserHypermediaRelations.getFind, {
        href: `/users/{?userId,page,limit}`,
        templated: true,
        method: httpMethods.GET,
    })
  }
}
