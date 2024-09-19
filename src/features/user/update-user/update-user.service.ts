import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UpdateParamCommand, UpdatePayloadCommand } from './update-user.dto';
import { UpdateUserHypermediaRelations } from './update-user-hypermedia-relations';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { UpdateUser } from './update-user.interface';

@Injectable()
export class UpdateUserHandler {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly updateUserHypermediaRelations: UpdateUserHypermediaRelations
    ){}
    async handle(params:UpdateParamCommand, payload:UpdateUser){
        try{
            const { uuid } = params;
            const user = await this.userRepository.updateUserByUuid(uuid,payload);
            const response =  new AddHypermediaLinks(user);
            return response
            .addLink(this.updateUserHypermediaRelations.self, {
              href: `/users/${user.uuid}`,
              method: 'PATCH'
            })
            .addLink(this.updateUserHypermediaRelations.deleteUser, {
              href: `users/${user.uuid}`,
              method:'DELETE'
            })
            .addLink(this.updateUserHypermediaRelations.getFind, {
                href: `/users/{?userId,page,limit}`,
                templated: true,
                method: 'GET',
            })
            .getData();
        }
        catch(error){
            throw error;
        }
    }
}
