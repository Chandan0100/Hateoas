import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserHypermediaRelations {
  private readonly SELF = 'self';
  private readonly DELETE_USER = 'delete-user';
  private readonly FIND = 'find';

  public get self(): string {
    return this.SELF;
  }

  public get deleteUser(): string {
    return this.DELETE_USER;
  }
  
  public get getFind(): string {
    return this.FIND
  }

  public getRelations(): Record<string, string> {
    return {
      self: this.self,
      deleteUser: this.deleteUser,
      getAllUsers: this.getFind
    };
  }
}
