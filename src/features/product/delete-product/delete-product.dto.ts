import { IsNotEmpty } from 'class-validator';

export class DeleteProductCommand {
  @IsNotEmpty()
  uuid: string;
}
