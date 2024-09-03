import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetUser } from './get-user.interface';

@Injectable()
export class GetUserServiceHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(payload: GetUser) {
    try {
      const user = await this.userRepository.getUserByUUID(payload.uuid);
      const response = user;
      response['_links'] = {
        self: {
          href: '/get-user',
        },
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
}
