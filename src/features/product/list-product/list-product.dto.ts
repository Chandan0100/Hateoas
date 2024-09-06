import { IsNumber, IsString } from 'class-validator';

export class GetProductCommand {
  @IsString()
  user_id?: string;

  @IsNumber()
  page?: number;

  @IsNumber()
  limit?: number;
}
