import { Module } from '@nestjs/common';
import { DeleteUserService } from './delete-user/delete-user.service';
import { DeleteUserController } from './delete-user/delete-user.controller';
import { AddUserController } from './add-user/add-user.controller';
import { AddUserService } from './add-user/add-user.service';

@Module({
  controllers: [ DeleteUserController, AddUserController ],
  providers: [ DeleteUserService, AddUserService],
})
export class DeleteUserModule {}
