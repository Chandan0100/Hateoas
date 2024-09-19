import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllUsersHypermediaRelations {
  private readonly SELF = 'self';
  private readonly DELETE_USER = 'delete-user';
  private readonly UPDATE_USER = 'update-user';
  private readonly GET_ALL_USERS = 'get-all-users';
  private readonly PREV = 'prev';
  private readonly FIND = 'find';
  private readonly NEXT = 'next';

  public get self(): string {
    return this.SELF;
  }

  public get deleteUser(): string {
    return this.DELETE_USER;
  }

  public get updateUser(): string {
    return this.UPDATE_USER;
  }

  public get getAllUsers(): string {
    return this.GET_ALL_USERS;
  }

  public get getPrev(): string {
    return this.PREV
  }

  public get getFind(): string {
    return this.FIND
  }

  public get getNext(): string {
    return this.NEXT
  }

  public getRelations(): Record<string, string> {
    return {
      self: this.self,
      deleteUser: this.deleteUser,
      updateUser: this.updateUser,
      getAllUsers: this.getAllUsers,
      getPrev: this.getPrev,
      getFind: this.getFind,
      getNext: this.getNext
    };
  }
}
