import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { DeleteUser } from './delete-user.interface';

@Injectable()
export class DeleteUserService {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async handle( id:string ) {
        try {
            const user =  await this.userRepository.createUser(id)
            const response = user;
            response['_links'] = {
                self : ``
            }
            return response;
        }
        catch(error) {
            throw error
        }
    }
}
