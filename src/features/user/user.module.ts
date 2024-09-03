import { Module } from '@nestjs/common';
import { DeleteUserServiceHandler } from './delete-user/delete-user.service';
import { DeleteUserController } from './delete-user/delete-user.controller';
import { AddUserController } from './add-user/add-user.controller';
import { AddUserServiceHandler } from './add-user/add-user.service';
import { GetUserController } from './get-user/get-user.controller';
import { GetUserServiceHandler } from './get-user/get-user.service';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';

@Module({
  imports: [],
  controllers: [
    DeleteUserController,
    AddUserController, 
    GetUserController
  ],
  providers: [
    DeleteUserServiceHandler, 
    AddUserServiceHandler, 
    GetUserServiceHandler,
    UserRepository
  ],
})
export class UserModule {}
