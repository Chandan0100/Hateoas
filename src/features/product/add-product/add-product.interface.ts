import { User } from 'src/domain/user/user.entity';

export interface AddProduct {
  name: string;
  user_id: User;
  description: string;
  amount: number;
}
