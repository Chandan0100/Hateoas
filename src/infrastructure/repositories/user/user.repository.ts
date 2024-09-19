import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { AddUser } from 'src/features/user/add-user/add-user.interface';
import { GetAllUsersQuery } from 'src/features/user/get-all-users/get-al-users.interface';
import { UpdateUser } from 'src/features/user/update-user/update-user.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(payload: AddUser, transaction = null): Promise<User> {
    if (transaction) {
      return await transaction.save(User, payload);
    }
    return await this.save(payload);
  }

  public async getUserByUUID(uuid: string): Promise<User> {
    return await this.findOne({ where: { uuid } });
  }

  public async getAllUsers({ userId, page, limit }: GetAllUsersQuery): Promise<User[]> {
    const skip = page && (page - 1) * limit;

    return await this.find({
      where: { uuid: userId },
      skip,
      take: limit,         
    });
  }

  public async updateUserByUuid(uuid:string, payload:UpdateUser): Promise<User> {
    await this.update({uuid}, payload)
    const user = await this.findOne({ where: { uuid } });
    return user;
  }
  
  public async deleteUserByUuid(uuid: string) {
    return this.createQueryBuilder('user')
      .where('user.uuid = :uuid', { uuid })
      .delete();
  }
}
