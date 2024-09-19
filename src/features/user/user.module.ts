import { Module } from '@nestjs/common';
import { DeleteUserHandler } from './delete-user/delete-user.service';
import { DeleteUserController } from './delete-user/delete-user.controller';
import { AddUserController } from './add-user/add-user.controller';
import { AddUserHandler } from './add-user/add-user.service';
import { GetUserController } from './get-user/get-user.controller';
import { GetUserHandler } from './get-user/get-user.service';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { GetProductsHandler } from '../product/list-product/list-product.service';
import { ProductRepository } from 'src/infrastructure/repositories/product/product.repository';
import { AddUserHypermediaRelations } from './add-user/add-user-hypermedia-relations';
import { GetUserHypermediaRelations } from './get-user/get-user-hypermedia-relations';
import { UpdateUserHypermediaRelations } from './update-user/update-user-hypermedia-relations';
import { GetAllUsersController } from './get-all-users/get-all-users.controller';
import { GetAllUsersHandler } from './get-all-users/get-all-users.service';
import { GetAllUsersHypermediaRelations } from './get-all-users/get-all-users-hypermedia-relations';
import { DeleteUserHypermediaRelations } from './delete-user/delete-user-hypermedia-relations';
@Module({
  imports: [],
  controllers: [DeleteUserController, AddUserController, GetUserController, GetAllUsersController],
  providers: [
    DeleteUserHandler,
    AddUserHandler,
    GetUserHandler,
    GetAllUsersHandler,
    UserRepository,
    GetProductsHandler,
    ProductRepository,
    AddUserHypermediaRelations,
    GetUserHypermediaRelations,
    UpdateUserHypermediaRelations,
    GetAllUsersHypermediaRelations,
    DeleteUserHypermediaRelations
  ],
})
export class UserModule {}
