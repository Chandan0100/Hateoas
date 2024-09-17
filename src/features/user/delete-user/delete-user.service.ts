import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Injectable()
export class DeleteUserServiceHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(uuid: string) {
    return await this.userRepository.deleteUser(uuid);
  }
}
