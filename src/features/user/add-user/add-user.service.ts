import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';
import { AddUser } from './add-user.interface';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';

@Injectable()
export class AddUserServiceHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(userPayload: AddUser) {
    const user = await this.userRepository.createUser(userPayload);
    const response = new AddHypermediaLinks(user);
    return response
      .addLink('self', {
        href: `/get-user/${user.uuid}`,
      })
      .getData();
  }
}
