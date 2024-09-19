import { Injectable } from '@nestjs/common';

@Injectable()
export class AddUserHypermediaRelations {
  private readonly SELF = 'self';
  private readonly DELETE_USER = 'delete-user';
  private readonly UPDATE_USER = 'update-user';

  public get self(): string {
    return this.SELF;
  }

  public get deleteUser(): string {
    return this.DELETE_USER;
  }

  public get updateUser(): string {
    return this.UPDATE_USER;
  }

  public getRelations(): Record<string, string> {
    return {
      self: this.self,
      deleteUser: this.deleteUser,
      updateUser: this.updateUser,
    };
  }
}
