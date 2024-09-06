import { IsNotEmpty } from 'class-validator';

export class GetProductCommand {
  @IsNotEmpty()
  uuid: string;
}
