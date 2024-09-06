import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/domain/user/user.entity';

export class AddProductCommand {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  user_id: User;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
