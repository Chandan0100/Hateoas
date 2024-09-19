import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserHypermediaRelations {
  private readonly SELF = 'self';
  private readonly DELETE_USER = 'delete-user';
  private readonly UPDATE_USER = 'update-user';
  private readonly GET_USER = 'get-user';

  public get self(): string {
    return this.SELF;
  }

  public get deleteUser(): string {
    return this.DELETE_USER;
  }

  public get updateUser(): string {
    return this.UPDATE_USER;
  }

  public get getUser(): string {
    return this.GET_USER;
  }
  
  public getRelations(): Record<string, string> {
    return {
      self: this.self,
      deleteUser: this.deleteUser,
      updateUser: this.updateUser,
      getUser: this.getUser
    };
  }
}
