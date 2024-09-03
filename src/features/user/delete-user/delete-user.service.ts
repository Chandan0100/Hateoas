import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { DeleteUser } from './delete-user.interface';

import { AddUser } from '../add-user/add-user.interface';

@Injectable()
export class DeleteUserServiceHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(obj: AddUser) {
    try {
      const user = await this.userRepository.createUser(obj);
      const response = user;
      response['_links'] = {
        self: ``,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
