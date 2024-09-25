import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { AddHypermediaLinks } from 'src/infrastructure/common/add-hypermedia-links';
import { GetAllUsersHypermediaRelations } from './get-all-users-hypermedia-relations';
import { GetAllUsersQuery } from './get-al-users.interface';
import { httpMethods } from 'src/infrastructure/common/constant';

@Injectable()
export class GetAllUsersHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly getAllUsersHypermediaRelations: GetAllUsersHypermediaRelations,
  ) {}

  public async handle(query: GetAllUsersQuery) {
    try {
      const { userId, page, limit } = query;
      const users = await this.userRepository.getAllUsers({
        userId,
        page,
        limit,
      });
      const usersLinks = {
        users: users.map((user) => {
          const response = new AddHypermediaLinks(user);
          return response
            .addLink(this.getAllUsersHypermediaRelations.self, {
              href: `/users/${user.uuid}`,
            })
            .addLink(this.getAllUsersHypermediaRelations.updateUser, {
              href: `/users/${user.uuid}`,
              method: httpMethods.PATCH,
            })
            .addLink(this.getAllUsersHypermediaRelations.deleteUser, {
              href: `/users/${user.uuid}`,
              method: httpMethods.DELETE,
            })
            .getData();
        }),
      };
      const links = new AddHypermediaLinks(usersLinks);
      if (page > 1) {
        links.addLink(this.getAllUsersHypermediaRelations.getPrev, {
          href: `/users?${page - 1}`,
          method: httpMethods.GET,
        });
      }
      links
        .addLink(this.getAllUsersHypermediaRelations.self, {
          href: `/users?page=${page}&limit=${limit}`,
          method: httpMethods.GET,
        })
        .addLink(this.getAllUsersHypermediaRelations.getFind, {
          href: `/users/{?userId,page,limit}`,
          templated: true,
          method: httpMethods.GET,
        })
        .addLink(this.getAllUsersHypermediaRelations.getNext, {
          href: `/users?${page + 1}`,
          method: httpMethods.GET,
        });
      links.addEmbedded({ field: 'users', rel: 'users' });
      return { ...links.getData(), page, limit, total: users.length };
    } catch (error) {
      throw error;
    }
  }
}
