import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetUserCommand {
  @IsNotEmpty()
  uuid: string;
}