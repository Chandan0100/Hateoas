import { Controller } from '@nestjs/common';
import { UpdateUserService } from './update-user.service';

@Controller('update-user')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}
}
