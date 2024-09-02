import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { AddUser } from 'src/features/user/add-user/add-user.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async createUser(payload: AddUser,transaction = null): Promise<AddUser> {
    if (transaction) {
      return await transaction.save(User, payload);
    }
    return await this.save(payload);
  }
  async getUserByEmailOrUUID(email: string, uuid: string): Promise<User | undefined> {
    return await this.createQueryBuilder('user')
      .where('user.email = :email OR user.uuid = :uuid', { email, uuid })
      .getOne();
  }
  async getUserByUUID(uuid: string): Promise<User> {
    return await this.findOne({ where: { uuid } });
  }
}
