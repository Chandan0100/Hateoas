import { UserRepository } from './../../../infrastructure/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';
import { AddUser } from './add-user.interface'

@Injectable()
export class AddUserServiceHandler {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async handle( userPayload:AddUser ) {
        try {
            const user =  await this.userRepository.createUser(userPayload)
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
