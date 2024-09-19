import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserHypermediaRelations {
  private readonly SELF = 'self';
  private readonly FIND = 'find';

  public get self(): string {
    return this.SELF;
  }

  public get getFind(): string {
    return this.FIND
  }

  public getRelations(): Record<string, string> {
    return {
      self: this.self,
      getFind: this.getFind,
    };
  }
}
