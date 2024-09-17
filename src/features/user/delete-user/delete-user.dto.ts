import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserCommand {
  @IsNotEmpty()
  @IsString()
  uuid: string;
}
